import {render, screen, waitFor} from '@testing-library/react'
import mockBackend from './testSupport/helpers/mockBackend'
import {
  accounts_without_checkr_account,
  accounts_with_uncredentialed_checkr_account,
  accounts_with_credentialed_checkr_account,
  accounts_with_deauthorized_checkr_account,
} from './testSupport/fixtures/accounts.json'
import {candidates as candidates_fixture} from './testSupport/fixtures/candidates.json'
import queryClient from '../QueryClient'
import {QueryClientProvider} from 'react-query'
import AppPageObject from './testSupport/page_objects/App.js'
import CandidatesPageObject from './testSupport/page_objects/Candidates.js'
import App from '../components/App.js'

const Page = () => (
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
)

describe('App', () => {
  const accountPage = new AppPageObject(screen)
  const backend = new mockBackend()

  beforeAll(() => backend.server.listen())
  afterAll(() => backend.server.close())

  it('displays Connect to Checkr message and button when no checkr account exists', async () => {
    backend.stubHttpGet('/api/accounts', accounts_without_checkr_account)

    render(<Page />)
    await accountPage.initialLoad()

    accountPage.expectConnectToCheckrMessage()
  })

  it('displays "waiting for credentialed" message when the account is not credentialed', async () => {
    backend.stubHttpGet(
      '/api/accounts',
      accounts_with_uncredentialed_checkr_account,
    )

    render(<Page />)
    await accountPage.initialLoad()

    await accountPage.expectWaitingForCredentialedAccountMessage()
  })

  it('displays candidates page when credentialed checkrAccount exists', async () => {
    backend.stubHttpGet(
      '/api/accounts',
      accounts_with_credentialed_checkr_account,
    )
    backend.stubHttpGet('/api/candidates', candidates_fixture)
    const candidatesPage = new CandidatesPageObject(screen)

    render(<Page />)
    await candidatesPage.initialLoad()

    await waitFor(() => {
      candidatesPage.validateElementLength(
        'candidate-item',
        candidates_fixture.length,
      )
    })
  })

  it('displays "deauthorized account" message when the account has been deauthorized', async () => {
    backend.stubHttpGet(
      '/api/accounts',
      accounts_with_deauthorized_checkr_account,
    )

    render(<Page />)
    await accountPage.initialLoad()

    await accountPage.expectDeauthorizedAccountMessage()
  })
})
