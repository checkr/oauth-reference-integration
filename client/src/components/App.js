/*
  This page has 3 different views
  
  1. Account has not been connected to Checkr
    
    * Click the button displayed on the page to go through Checkr's sign-up flow 
      to connect an Account to Checkr's ecosystem. 
    * Once finished, you will be redirected to the backend OAuth route with a <code> 
      and <state> parameter. The backend will complete the OAuth process with Checkr
      and create an <access_token> to validate requests. Once this token is saved
      in the database, you will be redirected back to this React application.

  2. Account is uncredentialed
    
    * After account connection your Checkr Account must be credentialed by Checkr, this 
      process may take 1-3 days. If your account is configured to have pre-credentialed 
      accounts the page will update once the <account.credentialed> webhook has been 
      successfully processed by your backend.

  3. Account is credentialed
  
    * Add/Edit candidates
    * Request/View background checks using Checkr Embeds
*/

import {useState} from 'react'
import {useCustomerAccount} from '../hooks/useCustomerAccount.js'
import Navbar from './Navbar.js'
import Loading from './Loading.js'
import Candidates from './candidates/Candidates.js'
import CheckrConnectLink from './account/CheckrConnectLink.js'
import CheckrAccountStatus from './account/CheckrAccountStatus.js'
import Notifications from './Notifications.js'

export default function App() {
  const [toasts, setToasts] = useState([])
  const {account} = useCustomerAccount()

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
          {account.data && account.data.checkrAccount.state === 'disconnected' && (
            <CheckrAccountStatus
              headerContent="Acme HR + Checkr"
              textContent="Connect your Acme HR account with Checkr to run background 
              checks."
            >
              <CheckrConnectLink customerAccountID={account.data.id} />
            </CheckrAccountStatus>
          )}
          {account.data &&
            account.data.checkrAccount.state === 'uncredentialed' && (
              <CheckrAccountStatus
                headerContent="Your Checkr account is waiting to be credentialed for use"
                textContent="Before you can create background check invitations, Checkr 
                must credentialize your business. This process can take 1-3 days, please 
                come back later. If it has been longer than 3 days, please contact Checkr 
                customer support."
              />
            )}
          {account.data &&
            account.data.checkrAccount.state === 'credentialed' && (
              <Candidates />
            )}
        </>
      )}
    </div>
  )
}
