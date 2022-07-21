# Developing

## Install dependencies

```shell
yarn setup
```

## Setup Environment Variables

1. Create an `.env` file in the outermost directory and copy the variables from
   `.env.example`

```
CHECKR_API_URL='https://api.checkr-staging.com'
CHECKR_OAUTH_CLIENT_ID=your_partner_application_client_id
CHECKR_OAUTH_CLIENT_SECRET=your_partner_application_client_secret
```

2. In the client directory, create an `.env` file and copy the variables from
   `.env.example`

```
REACT_APP_CHECKR_OAUTH_CLIENT_ID=your_partner_application_client_id
```

## Run it locally

1. This implementation uses the free version of [ngrok](https://ngrok.com/) to
   enable testing of your integration in your localhost environment. Run the app
   locally.

```
yarn dev
```

2. Use the values of _OAuth webhook URL_ and _OAuth redirect URL_ in the server
   output in your
   [Partner Application Settings](https://dashboard.checkrhq-staging.net/account/applications).

```
OAuth redirect URL: https://{your-ngrok-url}/api/checkr/oauth
OAuth webhook URL: https://{your-ngrok-url}/api/checkr/webhooks
```

## Run tests

Run the following commands to run tests for the backend and frontend.

```shell
yarn test:backend
```

```shell
yarn test:frontend
```

## VS Code Recommended Settings

The `.vscode` folder contains opt-in
[Workspace Settings](https://code.visualstudio.com/docs/getstarted/settings) and
[Extension Recommendations](https://code.visualstudio.com/docs/editor/extension-gallery#_workspace-recommended-extensions)
that the Checkr team recommends using when working on this repository.
