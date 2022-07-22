/*

  This page has 4 different views
  
  1. Account has not been connected to Checkr
    
    * Click the button displayed on the page to go through Checkr's sign up flow 
      to connect an Account to Checkr's ecosystem. 
    * After a successful connection, you will be redirected back to the page with 
      a <code> and <state> parameter in the URL. These parameters are used to update 
      account details in the account.database with an access token and account id.
    * Once redirected, the application will attempt to finalize the connection 
      process.

  2. Account is not credentialed
    
    * After account connection your Account must be credentialed by Checkr, this 
      process may take 1-3 days. If your account is configured to have pre-credentialed 
      accounts the page will update once the account.credentialed webhook has been 
      successfully processed.

  3. Account is connected and credentialed
  
    * Add/Edit candidates
    * Request background checks using Checkr Embeds
    * View background check progress

  4. Account has been deauthorized

    * Checkr has deauthorized your account and you can no longer send invitations 
      via the Dashboard or API
*/

import {useState} from 'react'
import {Button} from 'react-bootstrap'
import {useAccount} from '../hooks/useAccount.js'
import {getAccountStatus} from '../helpers/getAccountStatus.js'
import Navbar from './Navbar.js'
import Loading from './Loading.js'
import Candidates from './candidates/Candidates.js'
import CheckrConnectButton from './account/CheckrConnectButton.js'
import AccountStatus from './account/AccountStatus.js'
import Notifications from './Notifications.js'

export default function App() {
  const [toasts, setToasts] = useState([])
  const {account, update} = useAccount()

  const {
    deauthorizedAccount,
    disconnectedAccount,
    uncredentialedAccount,
    credentialedAccount,
  } = getAccountStatus(account)

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
          {deauthorizedAccount && (
            <AccountStatus
              headerContent="Your Checkr account has been deauthorized"
              textContent="This account is no longer credentialed and cannot send 
              invitations via the Dashboard or API"
            >
              <Button
                size="lg"
                onClick={() => {
                  update.mutate(account.data.id, {deauthorized: false})
                }}
              >
                Back
              </Button>
            </AccountStatus>
          )}
          {disconnectedAccount && (
            <AccountStatus
              headerContent="Acme HR + Checkr"
              textContent="Connect your Acme HR account with Checkr to run background 
              checks."
            >
              <CheckrConnectButton accountId={account.data.id} />
            </AccountStatus>
          )}
          {uncredentialedAccount && (
            <AccountStatus
              headerContent="Your Checkr account is waiting to be credentialed for use"
              textContent="Before you can create background check invitations, Checkr 
                must credentialize your business. This process can take 1-3 days, please 
                come back later. If it has been longer than 3 days, please contact Checkr 
                customer support."
            />
          )}
          {credentialedAccount && <Candidates />}
        </>
      )}
    </div>
  )
}
