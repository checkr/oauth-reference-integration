# Development Setup

1. Install all dependencies:

```
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

# Run Development Environment

This implementation uses
[localtunnel](https://github.com/localtunnel/localtunnel) to enable testing of
your integration in your localhost environment.

1. Setup the development backend by running this command

```
yarn dev:backend
```

2. In a new terminal window, setup the localtunnel connection for the backend by
   running this command

```
yarn dev:backend:localtunnel
```

3. Enable the localtunnel URL created in step 2 by navigating to this location
   in the browser and clicking "Continue".

4. Append the URL with "/api/checkr/webhooks" to create your Webhooks URL. For
   example, if your Public URL is
   `https://all-kings-matter-104-164-31-146.loca.lt`, your Webhooks URL will
   look like
   `https://all-kings-matter-104-177-32-148.loca.lt/api/checkr/webhooks`.

5. Use this Webhooks URL in your
   [Partner Application Settings](https://dashboard.checkrhq-staging.net/account/applications).

6. In a new terminal window, setup the frontend by running this command

```
cd client/ && yarn dev:frontend
```

7. In a new terminal window, setup the localtunnel connection for the frontend
   by running this command

```
cd client/ && yarn dev:frontend:localtunnel
```

8. Enable the localtunnel URL created in step 6 by navigating to the URL in the
   browser and clicking "Continue". Then copy the Public URL into the Redirect
   URL field in your
   [Partner Application Settings](https://dashboard.checkrhq-staging.net/account/applications).

9. Navigate to your frontend Public URL in your browser.

# VS Code Recommended Settings

The `.vscode` folder contains opt-in
[Workspace Settings](https://code.visualstudio.com/docs/getstarted/settings) and
[Extension Recommendations](https://code.visualstudio.com/docs/editor/extension-gallery#_workspace-recommended-extensions)
that the Checkr team recommends using when working on this repository.
