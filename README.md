# Development Setup

1. Install all dependencies:

```shell
yarn setup
```

2. Setup Environment Variables

> Create an `.env` file and copy the variables from `.env.example`

```
CHECKR_API_URL='https://api.checkr-staging.com'
CHECKR_OAUTH_CLIENT_ID=your_partner_application_client_id
CHECKR_OAUTH_CLIENT_SECRET=your_partner_application_client_secret
```

3. Run it locally:

This implementation uses the free version of [ngrok](https://ngrok.com/) to
enable testing of your integration in your localhost environment.

Run the following commands in separate terminals to start the backend and the
frontend.

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
