import {Button} from 'react-bootstrap'

// Connect your account to Checkr
// ---------------
//
// The first step to connecting your customer accounts to Checkr is to create a
// ```CheckrConnectButton```. This button will redirect your customers to Checkr
// when they link their account

export default function CheckrConnectButton({accountId}) {
  const checkrSignupFlowHref = accountId => {
    // Navigate to your Partner Application's Sign-up flow link
    // ---------------
    //
    // Replace this URL with your Sign-up Flow URL from your partner
    // application settings. Your partner application settings can be found in
    // https://dashboard.checkrhq-staging.net/account/applications
    const signupFlowURL = new URL(
      `${process.env.REACT_APP_CHECKR_PARTNER_URL}/authorize/${process.env.REACT_APP_CHECKR_OAUTH_CLIENT_ID}/signup`,
    )

    // Define a state variable that will help you identify which account is
    // connecting to Checkr. In this case, we will use the accountId as the
    // state variable. This state value will be used later to verify the account
    // connection
    signupFlowURL.searchParams.append('state', accountId)
    return signupFlowURL.href
  }

  return (
    <Button
      size="lg"
      onClick={() => {
        window.location.href = checkrSignupFlowHref(accountId)
      }}
    >
      Connect to Checkr
    </Button>
  )
}
