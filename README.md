# Development Setup

1. Install all dependencies:

```shell
yarn setup
```

2. Setup Environment Variables

> Create an `.env` file and copy the variables from `.env.example`

```
CHECKR_API_URL='https://api.checkr-staging.com/v1'
CHECKR_OAUTH_URL='https://api.checkr-staging.com/oauth'
CHECKR_OAUTH_CLIENT_ID=your_partner_application_client_id
CHECKR_OAUTH_CLIENT_SECRET=your_partner_application_client_secret
ENCRYPTION_SECRET_KEY_FROM_SECURE_VAULT='65520b062cff37a7b7632d0da163025dc39b17497bb16de6c42c3820da88c825'
```

3. Run tests locally:

Backend tests:

```shell
yarn test:backend
```

Watch frontend tests:

```shell
yarn test:frontend
```

3. Run it locally:

This implementation uses the free version of [ngrok](https://ngrok.com/) to
enable testing of your integration in your localhost environment.

Run the following commands in separate terminals to start the backend and the frontend.

```shell
yarn dev:backend
```

```shell
yarn dev:frontend
```

# VS Code Recommended Settings

The `.vscode` folder contains opt-in
[Workspace Settings](https://code.visualstudio.com/docs/getstarted/settings) and
[Extension Recommendations](https://code.visualstudio.com/docs/editor/extension-gallery#_workspace-recommended-extensions)
that the Checkr team recommends using when working on this repository.
