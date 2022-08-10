# Reference Integration

![Build status](https://github.com/checkr/oauth-reference-integration/actions/workflows/main.js.yml/badge.svg?branch=main)

This is a sample application demonstrating an end to end Checkr integration. It
outlines best practices and patterns we see Checkr integrations adopt, and will
help you develop a Checkr certified integration. It focuses on two use-cases:

- How to use the
  [Checkr-Hosted Signup flow](https://docs.checkr.com/partners/#section/Getting-Started/Connect-your-customers-to-Checkr)
  to connect your customers to Checkr.
- How to order background checks and report results using
  [Checkr Embeds](https://docs.checkr.com/embeds).

You can refer to this application if you are building either one or both
use-cases.

<br />

![Demo](docs/images/demo.gif)

<br />

# Contents

- [Use case: Connecting customers](#use-case-connecting-customers)
- [Use case: Using Embeds to order background checks](#use-case-using-embeds-to-order-background-checks)
- [Live Sandbox](#live-sandbox)
- [Technical Documentation](#technical-documentation)
- [Running it locally](#running-it-locally)
- [Got feedback?](#got-feedback)

## Use case: Connecting customers

With Checkr OAuth, your customers can easily connect their Checkr account with
your product. It gives your product the ability to make API calls on behalf of
your customers. This described in more detail in our
[partner guide](https://docs.checkr.com/partners/#section/Getting-Started/Connect-your-customers-to-Checkr).

#### Application components

| Component                                                                                                                                  | Responsibility                      | Code walkthrough                                                                                                        |
| ------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| [oauth.js](https://github.com/checkr/oauth-reference-integration/blob/main/routes/oauth.js)                                                | Handles OAuth and Webhooks          | [walkthrough](https://checkr-oauth-integration.herokuapp.com/docs/routes/oauth.html)                                    |
| [CheckrConnectLink.js](https://github.com/checkr/oauth-reference-integration/blob/main/client/src/components/account/CheckrConnectLink.js) | Link to connect account with Checkr | [walkthrough](https://checkr-oauth-integration.herokuapp.com/docs/client/src/components/account/CheckrConnectLink.html) |

```mermaid
sequenceDiagram
  autonumber

    Note right of App Frontend: CheckrConnectLink pressed
    Note right of Partner customer signup flow: Checkr Account created

    App Frontend->>+Partner customer signup flow: Navigate to Checkr Sign-Up Flow URL
    Partner customer signup flow->>+oauth.js: Navigate to redirect URL
    oauth.js->>+Checkr: Request OAuth Access token
    Checkr->>+oauth.js: Respond with OAuth Access token
    oauth.js->>+App Database: Persist and encrypt OAuth Access token in App Database
    oauth.js->>+App Frontend: Redirect to App Frontend

    Note right of App Frontend: Account is waiting credentialing
    Checkr->>+oauth.js: Send account.credentialed webhook
    oauth.js->>+App Database: Update Checkr account state
    Note right of App Frontend: Account is credentialed

    App Frontend->>+Checkr: POST /oauth/deauthorize
    Checkr->>+oauth.js: HTTP 200
    Note right of Checkr: Token has been deauthorized
    oauth.js->>+App Frontend: HTTP 204
    Checkr->>+oauth.js: Send token.deauthorized webhook
    oauth.js->>+App Database: Delete access token from database
    Note right of App Frontend: Account is disconnected

```

## Use case: Using Embeds to order background checks

Embeds provide Javascript and React components to quickly build an experience to
order background checks and view results. Read more about it
[here](https://docs.checkr.com/embeds/).

#### Application components

| Component                                                                                                                   | Responsibility                                 | Code walkthrough                                                                                     | Diagram                                                                |
| --------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| [embeds-session-tokens.js](https://github.com/checkr/oauth-reference-integration/blob/main/routes/embeds-session-tokens.js) | Handles requesting a Session token from Checkr | [walkthrough](https://checkr-oauth-integration.herokuapp.com/docs/routes/embeds-session-tokens.html) | [diagram](https://docs.checkr.com/embeds/#section/Getting-Started/Add-authentication) |

## Live sandbox

An instance of this application is hosted at
[checkr-oauth-integration.herokuapp.com](https://checkr-oauth-integration.herokuapp.com).
It is connected to a demo staging Checkr account which does not run real
background checks.

You can also deploy this using your own Heroku account, and connect it to your
Checkr account.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## Technical Documentation

- [API docs](https://docs.checkr.com)
- [Partner Guide](https://docs.checkr.com/partners)
- [Embeds docs](https://docs.checkr.com/embeds)

## Running it locally

View the [development page](docs/Developing.md) to run this project locally.

## Got feedback?

[Open an issue](https://github.com/checkr/oauth-reference-integration/issues) in
this repository to ask a question or give us feedback.
