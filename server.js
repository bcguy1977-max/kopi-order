const express = require('express');
const crypto = require('crypto');
const { App } = require('@octokit/app');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

const githubApp = new App({
  appId: process.env.GITHUB_APP_ID,
  privateKey: process.env.GITHUB_PRIVATE_KEY,
  clientId: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
});

function verifySignature(req, res, next) {
  const signature = req.headers['x-hub-signature-256'];
  const secret = process.env.GITHUB_WEBHOOK_SECRET;

  if (!signature || !secret) {
    return res.status(401).send('Webhook signature missing or secret not configured.');
  }

  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(req.body);
  const digest = `sha256=${hmac.digest('hex')}`;

  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest))) {
    return res.status(401).send('Invalid webhook signature.');
  }

  next();
}

app.post('/webhook', express.raw({ type: 'application/json' }), verifySignature, (req, res) => {
  const event = req.headers['x-github-event'];
  const payload = JSON.parse(req.body.toString());

  console.log(`Received GitHub event: ${event}`);
  console.log(JSON.stringify(payload, null, 2));

  // TODO: add event handling logic here
  if (event === 'issues') {
    // Example: handle issue opened, commented, etc.
  }

  res.status(200).send('Webhook received');
});

app.get('/setup', (req, res) => {
  res.send('GitHub App setup endpoint placeholder. Finish your installation flow here.');
});

app.get('/token', async (req, res) => {
  try {
    const jwt = await githubApp.getSignedJsonWebToken();
    res.json({ jwt });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to generate GitHub App JWT' });
  }
});

app.listen(port, () => {
  console.log(`GitHub App server running on http://localhost:${port}`);
});
