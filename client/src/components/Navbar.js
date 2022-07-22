import {Container, Nav, Navbar, NavDropdown} from 'react-bootstrap'
import {toastSuccess, toastFailure} from '../helpers/toasts.js'
import queryClient from '../QueryClient.js'

export default function NavBar({createToast, children, account}) {
  function User() {
    return (
      <Navbar.Text className="justify-content-end pe-3">John Doe</Navbar.Text>
    )
  }

  function Settings({createToast, account}) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({token: account.checkrAccount.accessToken}),
    }

    const handleDisconnect = async () => {
      try {
        const response = await fetch('/api/checkr/disconnect', options)
        if (!response.ok) {
          const data = await response.json()

          createToast(
            toastFailure({
              body: 'Your request to deauthorize your account has failed. Try again later!',
              header: data.error[0],
            }),
          )
        } else {
          queryClient.invalidateQueries('account')
          createToast(
            toastSuccess({
              body: 'Your account has been deauthorized successfully.',
            }),
          )
        }
      } catch (e) {
        createToast(
          toastFailure({
            body: 'Your request to deauthorize your account has failed. Try again later!',
          }),
        )
        console.error(e)
      }
    }

    return (
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="justify-content-end flex-grow-1 pe-3">
          <NavDropdown title="John Doe" align={{lg: 'end'}}>
            <NavDropdown.Item onClick={handleDisconnect}>
              Disconnect
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    )
  }

  return (
    <Navbar bg="dark" expand="lg" sticky="top">
      <Container fluid>
        <Navbar.Brand className="d-flex align-items-center">
          <img
            src={process.env.PUBLIC_URL + 'logo.png'}
            className="logo"
            alt="brand-logo"
          />
          <span className="px-1">Acme HR</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {account && account.checkrAccount ? (
          <Settings createToast={createToast} account={account} />
        ) : (
          <User />
        )}
        {children}
      </Container>
    </Navbar>
  )
}
