# Development Setup

### Install all dependencies:

```shell
yarn setup
```

### Setup Environment Variables

Create an `.env` file and copy the variables from `.env.example`

### Run tests locally:

```shell
yarn test:backend
```

```shell
yarn test:frontend
```

### Run it locally:

Locally, this project uses the free version of [ngrok](https://ngrok.com/) to
enable redirects and webhook processing. Sign up for a free account and go
through first time [setup](https://dashboard.ngrok.com/get-started/setup).

To start the application run the following command

```shell
yarn dev
```

Your `OAuth redirect URL` and `OAuth webhook URL` will be logged in the console.
Update your
[application settings](https://dashboard.checkrhq-staging.net/account/applications)
on the Checkr Dashboard with the logged values.

# VS Code Recommended Settings

The `.vscode` folder contains opt-in
[Workspace Settings](https://code.visualstudio.com/docs/getstarted/settings) and
[Extension Recommendations](https://code.visualstudio.com/docs/editor/extension-gallery#_workspace-recommended-extensions)
that the Checkr team recommends using when working on this repository.

# Known Issues

## msw testing library has a bug in node17 and node18

This node17 and node18 [bug](https://github.com/mswjs/msw/issues/1349) will
cause issues in some of our tests. While these problems are being fixed, we are
using node v16.16.0 for now.
