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
```

3. Run it locally:

This implementation uses the free version of [ngrok](https://ngrok.com/) to
enable testing of your integration in your localhost environment.

Start the frontend and backend servers by running this command:

```shell
yarn dev
```

4. Use the values of _OAuth webhook URL_ and _OAuth redirect URL_ in the server output in your [Partner Application Settings](https://dashboard.checkrhq-staging.net/account/applications). 

5. Navigate to [http://localhost:3000](http://localhost:3000) to view the integration.

# VS Code Recommended Settings

The `.vscode` folder contains opt-in
[Workspace Settings](https://code.visualstudio.com/docs/getstarted/settings) and
[Extension Recommendations](https://code.visualstudio.com/docs/editor/extension-gallery#_workspace-recommended-extensions)
that the Checkr team recommends using when working on this repository.
