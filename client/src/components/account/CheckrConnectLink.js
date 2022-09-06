import {Button} from 'react-bootstrap'

// This module demonstrates how to setup the most important initial step to
// connecting your users to Checkr: the [Checkr-Hosted Sign-up Flow
// Link](https://docs.checkr.com/partners/#section/Getting-Started/Connect-your-customers-to-Checkr).
// The sign-up flow will connect their Checkr account with our
// integration. This function covers:
export default function CheckrConnectLink({customerAccountID}) {
  // <details>
  //   <summary><b>Constructing your signup-flow link</b></summary>
  //
  // The CheckrConnectLink has two different parts:
  // - the ```sign-up flow link``` which is the link address next to the
  //   "Sign-up flow" Configuration in your [Partner
  //   Application](https://dashboard.checkrhq-staging.net/account/applications).
  // - the ```state``` variable which should be an account-level identifier in
  //   your product. "Account-level" means that multiple users may be associated
  //   with this account. For example, in this reference integration each
  //   customer account can have multiple users associated with it. If two
  //   different users login to our implementation to create background checks
  //   with Checkr, both users would use the same account-level Checkr OAuth
  //   access token. Since customer account is our account-level identifier, we
  //   set the customer account ID as the value for the ```state``` variable.
  //
  // Replace the ```signupFlowLink``` value with your ```sign-up flow link``` address
  //
  // Replace the customerAccountID with your account-level identifier
  // </details>
  const checkrSignupFlowHref = customerAccountID => {
    const signupFlowLink = `${process.env.REACT_APP_CHECKR_PARTNER_URL}/authorize/${process.env.REACT_APP_CHECKR_OAUTH_CLIENT_ID}/signup`
    const state = customerAccountID

    const url = new URL(signupFlowLink)
    url.searchParams.append('state', state)
    return url.href
  }

  // <details>
  //   <summary><b>Rendering your signup-flow link</b></summary>
  //
  // In this reference implementation, our signup-flow redirect link looks like a
  // button to our users but you can display the link however you need to.
  // </details>
  return (
    <Button
      size="lg"
      onClick={() => {
        window.location.href = checkrSignupFlowHref(customerAccountID)
      }}
    >
      Connect to Checkr
    </Button>
  )
}
