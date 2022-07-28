// This module contains the most important UI information for [connecting your
// users to
// Checkr](https://docs.checkr.com/partners/#section/Getting-Started/Connect-your-customers-to-Checkr).

import {useState} from 'react'
import {Button} from 'react-bootstrap'
import {useUserAccount} from '../hooks/useUserAccount.js'
import Navbar from './Navbar.js'
import Loading from './Loading.js'
import Candidates from './candidates/Candidates.js'
import CheckrAccountStatus from './account/CheckrAccountStatus.js'
import Notifications from './Notifications.js'

export default function OAuthApp() {
  const [toasts, setToasts] = useState([])

  // Here, we load the current user's account. Each user will have a Checkr
  // account in one of these states:
  // - ```disconnected```: A user's Checkr account is disconnected by default (if it has
  //   never been created) or if the user has asked to disconnect your integration
  //   from their Checkr account. A disconnected account becomes an
  //   ```uncredentialed``` account when your user initiates a connection to
  //   Checkr.
  // - ```uncredentialed```: A user can move their account from
  //   ```disconnected``` to ```uncredentialed``` by following the [Checkr Hosted
  //   Sign-up
  //   Flow](https://docs.checkr.com/partners/#section/Getting-Started/Connect-your-customers-to-Checkr).
  //   An ```uncredentialed``` account needs to be [```credentialed``` by
  //   Checkr](https://docs.checkr.com/partners/#section/Getting-Started/Customer-account-credentialing)
  //   before it can make background check requests.
  // - ```credentialed```: An ```uncredentialed``` account becomes
  //   ```credentialed``` when you receive an ```account.credentialed``` webhook
  //   from Checkr for this user. A ```credentialed``` Checkr account can become
  //   ```disconnected``` if your user decides to deauthorize your integration
  //   from making requests on their behalf.

  const {account} = useUserAccount()
  const checkrAccountState =
    account.isSuccess && account.data ? account.data.checkrAccount.state : null

  // #### Setup your Checkr Sign-up Flow Link
  // When your user wants to connect their account with Checkr, they must click
  // your your sign-up flow link and follow instructions on Checkr's webiste.
  // <mark>Clicking this link is a crucial first step for your user to setup
  // their Checkr account.</mark> Successfully following the sign-up flow
  // process will transition your user's Checkr account from a
  // ```disconnected``` state to a ```uncredentialed``` state.
  const checkrSignupFlowHref = accountId => {
    // Replace this URL value with your Sign-up Flow URL from your [partner
    // application](https://dashboard.checkrhq-staging.net/account/applications)
    // settings. Your URL is located next to the "Sign-up flow" section of your
    // partner application configuration. Your Sign-up Flow URL will be
    // different depending on whether you mean to use staging or production.
    const signupFlowURL = new URL(
      `${process.env.REACT_APP_CHECKR_PARTNER_URL}/authorize/${process.env.REACT_APP_CHECKR_OAUTH_CLIENT_ID}/signup`,
    )

    // ##### Set your sign-up flow ```state```
    // After a user finishes following Checkr's instructions in the sign-up
    // flow web page, Checkr will redirect them back to your website with this
    // ```state``` variable in the query param of their request. The
    // ```state``` variable is meant to allow you to set some context for how
    // to process Checkr's redirect.
    //
    // You should set the ```state``` query parameter to a value that can help
    // you identify which account is connecting to Checkr. In this case, since
    // we want to associate each Checkr account with each of our user accounts,
    // we use the user account ID as the value for the ```state``` variable.
    signupFlowURL.searchParams.append('state', accountId)
    return signupFlowURL.href
  }
  // ## Rendering our UI based on the Checkr account state
  return (
    <div>
      <Navbar
        createToast={newToast => {
          const storage = toasts.slice()
          storage.push(newToast)
          setToasts(storage)
        }}
        account={account.data}
      />
      <span
        role="alert"
        aria-busy={account.isLoading}
        aria-live="polite"
        data-testid="loading"
      />
      <Notifications toasts={toasts} handleNotification={setToasts} />
      {account.isError && <p className="center">Something went wrong...</p>}
      {account.isLoading && <Loading />}
      {account.isSuccess && (
        <>
          {checkrAccountState === 'disconnected' && (
            // #### ```disconnected``` state UI
            // Since the user's Checkr account is disconnected, we show them
            // the sign-up flow link that we constructed above and we ask them
            // to use it to connect to Checkr. To follow what happens after a
            // user finishes the sign-up flow instructions, check out the
            // [OAuth Redirect URL section of this OAuth backend
            // walkthrough](https://checkr-oauth-integration.herokuapp.com/docs/routes/oauth.html#section-2).
            <CheckrAccountStatus
              headerContent="Acme HR + Checkr"
              textContent="Connect your Acme HR account with Checkr to run background 
              checks."
            >
              <Button
                size="lg"
                onClick={() => {
                  window.location.href = checkrSignupFlowHref(account.data.id)
                }}
              >
                Connect to Checkr
              </Button>
            </CheckrAccountStatus>
          )}
          {checkrAccountState === 'uncredentialed' && (
            // #### ```uncredentialed``` state UI
            // Here we tell our users that they must wait for their account
            // to be credentialed. Once you receive Checkr's
            // ```account.credentialed``` webhook, you may transition their
            // account from ```uncredentialed``` to ```credentialed```.
            // Checkout [this code
            // walkthrough](https://checkr-oauth-integration.herokuapp.com/docs/routes/oauth.html#section-10)
            // for how to process Checkr's ```account.credentialed``` webhook
            // requests.
            <CheckrAccountStatus
              headerContent="Your Checkr account is waiting to be credentialed for use"
              textContent="Before you can create background check invitations, Checkr 
                must credentialize your business. This process can take 1-3 days, please 
                come back later. If it has been longer than 3 days, please contact Checkr 
                customer support."
            />
          )}
          {checkrAccountState === 'credentialed' && (
            // #### ```credentialed``` state UI
            // Once the user's checkr account is ```credentialed```, we allow
            // them to navigate to a page which will let them use their access
            // token to make background check requests.
            <Candidates />
          )}
        </>
      )}
    </div>
  )
}
