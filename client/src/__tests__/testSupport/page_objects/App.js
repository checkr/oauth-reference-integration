import {waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

class AppPageObject {
  constructor(screen) {
    this.screen = screen
  }

  async initialLoad() {
    await waitFor(() => {
      expect(this.screen.getByTestId('loading')).toHaveAttribute(
        'aria-busy',
        'false',
      )
    })
  }

  expectConnectToCheckrMessage() {
    expect(
      this.screen.getByText(
        'Connect your Acme HR account with Checkr to run background checks.',
      ),
    ).toBeInTheDocument()
    expect(this.screen.getByText('Connect to Checkr')).toBeInTheDocument()
  }

  async expectWaitingForCredentialedCheckrAccountMessage() {
    await waitFor(() => {
      expect(
        this.screen.getByText(
          'Your Checkr account is waiting to be credentialed for use',
        ),
      ).toBeInTheDocument()
    })
  }

  async expectDeauthorizedCheckrAccountMessage() {
    await waitFor(() => {
      expect(
        this.screen.getByText('Your Checkr account has been deauthorized'),
      ).toBeInTheDocument()
    })
  }

  clickConnectToCheckr() {
    userEvent.click(this.screen.getByName('Connect to Checkr'))
  }
}

export default AppPageObject
