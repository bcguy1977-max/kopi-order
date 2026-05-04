# kopi-order GitHub App

This repository now includes a GitHub App manifest file at `.github/github-app-manifest.json`.

## What this provides

- A manifest template for creating a GitHub App from this repo.
- Default permissions for repository content, issues, and metadata.
- Example webhook and redirect URLs that should be replaced with your own deployment URLs.

## Next steps

1. Deploy a backend to handle GitHub App webhook events and app installation.
2. Replace the placeholder values in `.github/github-app-manifest.json`:
   - `hook_attributes.url`
   - `redirect_url`
3. Create the GitHub App from the manifest in your GitHub organization or account.

## Creating the app

GitHub App manifests can be used during app creation. Follow GitHub's app creation flow and provide this manifest file when requested.

## Backend skeleton

This repo now includes a minimal Node.js backend skeleton for handling GitHub App webhooks and auth in `server.js`.

### Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the repo root with these values:

   ```env
   GITHUB_APP_ID=YOUR_APP_ID
   GITHUB_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\n...\n-----END RSA PRIVATE KEY-----"
   GITHUB_CLIENT_ID=YOUR_CLIENT_ID
   GITHUB_CLIENT_SECRET=YOUR_CLIENT_SECRET
   GITHUB_WEBHOOK_SECRET=YOUR_WEBHOOK_SECRET
   PORT=4000
   ```

3. Start the server:

   ```bash
   npm start
   ```

4. Update `.github/github-app-manifest.json` to use your real webhook and redirect URLs.

> NOTE: This repo currently contains static site files only. To fully install a GitHub App, you'll need a server to receive webhooks and manage app authentication.
