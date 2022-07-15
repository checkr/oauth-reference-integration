/*

  This page has 4 different views
  
  1. Account has not been connected to Checkr
    
    * Click the button displayed on the page to go through Checkr's sign up flow to connect
      an Account to Checkr's ecosystem. 
    * After a successful connection, you will be redirected back to the page with a <code> and <state>
      parameter in the URL. These parameters are used to update account details in the database with
      an access token and account id.
    * Once redirected, the application will attempt to finalize the connection process.

  2. Account is not credentialed
    
    * After account connection your Account must be credentialed by Checkr, this process may take
      1-3 days. If your account is configured to have pre-credentialed accounts the page will update once
      the account.credentialed webhook has been successfully processed.

  3. Account is connected and credentialed
  
    * Add/Edit candidates
    * Request background checks using Checkr Embeds
    * View background check progress

  4. Account has been deauthorized

    * Checkr has deauthorized your account and you can no longer send invitations via the Dashboard or API
*/

import {useState, useEffect} from 'react'
import {
  fetchFirstAccount,
  linkAccountToCheckr,
  editAccount,
} from '../../api/index.js'
import {toastSuccess} from '../../helpers/toasts.js'
import {useQuery, useQueryClient} from 'react-query'
import {useNavigate} from 'react-router-dom'
import {Button} from 'react-bootstrap'
import Navbar from '../Navbar.js'
import Loading from '../Loading.js'
import CandidatesPage from '../candidates/CandidatesPage.js'
import CheckrConnectButton from './CheckrConnectButton.js'
import AccountStatus from './AccountStatus.js'
import Notifications from '../Notifications.js'

export default function AccountPage() {
  const [toasts, setToasts] = useState([])
  const [isLinking, setIsLinking] = useState(false)
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const createToast = newToast => {
    const storage = toasts.slice()
    storage.push(newToast)
    setToasts(storage)
  }

  const urlParams = new URLSearchParams(window.location.search)
  const code = urlParams.get('code')
  const state = urlParams.get('state')

  const {isLoading, isError, isSuccess, data} = useQuery(
    'account',
    fetchFirstAccount,
    {
      refetchInterval: 5000,
      onSuccess: async () => {
        if (data && data.checkrAccount && data.checkrAccount.credentialed)
          navigate('../', {replace: true})
      },
    },
  )

  const deauthorizedAccount = data && data.deauthorized
  const connectedAccount = data && data.checkrAccount
  const disconnectedAccount =
    data && !data.checkrAccount && !code && !state && !deauthorizedAccount
  const uncredentialedAccount =
    connectedAccount && !data.checkrAccount.credentialed
  const credentialedAccount =
    connectedAccount && data.checkrAccount.credentialed
  const applyFlowCompleted =
    data && !data.checkrAccount && code && state === data.id
  const justCredentialed = data && data.showPrompts

  /*

    Attempt to finalize account connection process if
      * Account has not been yet connected
      * <state> and <code> URL params are found and valid
    
    If successful, a "checkrAccount" field in the database will be created for the account with an
      * accessToken
      * id

  */
  useEffect(() => {
    if (applyFlowCompleted)
      (async () => {
        try {
          setIsLinking(true)
          await linkAccountToCheckr(data.id, code, createToast)
          queryClient.invalidateQueries('account')
          setIsLinking(false)
        } catch (e) {
          navigate('../', {replace: true})
          setIsLinking(false)
          console.error(e)
        }
      })()

    if (justCredentialed)
      (async () => {
        try {
          createToast(
            toastSuccess({
              body: 'Your account has been credentialed, you can now send background check invitations via Checkr!',
            }),
          )
          await editAccount(data.id, {showPrompts: false})
        } catch (e) {
          console.error(e)
        }
      })()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, data, queryClient, state])

  return (
    <>
      <Navbar createToast={createToast} account={data} />
      <div className="CheckrAccount">
        <span
          role="alert"
          aria-busy={isLoading}
          aria-live="polite"
          data-testid="loading"
        ></span>
        <Notifications toasts={toasts} handleNotification={setToasts} />
        {isError && <p>Something went wrong...</p>}
        {(isLoading || isLinking) && <Loading />}
        {isSuccess && (
          <>
            {deauthorizedAccount && (
              <AccountHasBeenDeauthorized
                accountId={data.id}
                queryClient={queryClient}
              />
            )}
            {disconnectedAccount && <ConnectToCheckr accountId={data.id} />}
            {uncredentialedAccount && <WaitingForCredentialedCheckrAccount />}
            {credentialedAccount && <CandidatesPage />}
          </>
        )}
      </div>
    </>
  )
}

function ConnectToCheckr({accountId}) {
  return (
    <AccountStatus
      headerContent={'Acme HR + Checkr'}
      textContent={
        'Connect your Acme HR account with Checkr to run background checks.'
      }
    >
      <CheckrConnectButton accountId={accountId} />
    </AccountStatus>
  )
}

function WaitingForCredentialedCheckrAccount() {
  return (
    <AccountStatus
      headerContent={
        'Your Checkr account is waiting to be credentialed for use'
      }
      textContent={
        'Before you can create background check invitations, Checkr must credentialize your business. This process can take 1-3 days, please come back later. If it has been longer than 3 days, please contact Checkr customer support.'
      }
    />
  )
}

function AccountHasBeenDeauthorized({accountId, queryClient}) {
  return (
    <AccountStatus
      headerContent={'Your Checkr account has been deauthorized'}
      textContent={
        'This account is no longer credentialed and cannot send invitations via the Dashboard or API'
      }
    >
      <Button
        size="lg"
        onClick={async () => {
          await editAccount(accountId, {deauthorized: false})
          queryClient.invalidateQueries('account')
        }}
      >
        Back
      </Button>
    </AccountStatus>
  )
}
