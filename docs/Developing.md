# Development setup

## Prerequisites

* Node v16

## Install dependencies

```shell
yarn setup
```

### Setup environment variables

Create an `.env` file and copy the variables from `.env.example`

### Run it locally

Locally, this project uses the free version of [ngrok](https://ngrok.com/) to
enable redirects and webhook processing. Sign up for a free account and go
through first time [setup](https://dashboard.ngrok.com/get-started/setup).

To start the application run the following command

```shell
yarn dev
```

Your personalized `OAuth redirect URL` and `OAuth webhook URL` will be logged in
the console. Update your
[application settings](https://dashboard.checkrhq-staging.net/account/applications)
on the Checkr Dashboard with the logged values.

```
OAuth webhook URL  https://90f1-34-236-51-55.ngrok.io/api/checkr/webhooks
OAuth redirect URL  https://90f1-34-236-51-55.ngrok.io/api/checkr/oauth
```

### Run tests

```shell
yarn test:backend
```

```shell
yarn test:frontend
```

### VS Code Recommended Settings

The `.vscode` folder contains opt-in
[Workspace Settings](https://code.visualstudio.com/docs/getstarted/settings) and
[Extension Recommendations](https://code.visualstudio.com/docs/editor/extension-gallery#_workspace-recommended-extensions)
that the Checkr team recommends using when working on this repository.

## Unknown issues
### msw testing library has a bug in node17 and node18

This Node V17 and v18 [MSW bug](https://github.com/mswjs/msw/issues/1349) will
cause issues in some of our tests. While these problems are being fixed, we are
using node v16 for now.
