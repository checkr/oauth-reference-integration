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

This implementation uses the free version of [ngrok](https://ngrok.com/) to
enable testing of your integration in your localhost environment. When starting
this application, your `OAuth redirect URL` and `OAuth webhook URL` can be found
in the console. Update your application settings on the Checkr Dashboard with
the printed values.

```shell
yarn dev
```

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
