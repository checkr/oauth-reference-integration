import {Container, Nav, Navbar, NavDropdown} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import {toastSuccess, toastFailure} from '../helpers/toasts.js'
import {useQueryClient} from 'react-query'

export default function NavBar({createToast, children, account}) {
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
        <Documentation />
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

function Settings({createToast, account}) {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({token: account.checkrAccount.accessToken}),
  }

  return (
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="d-flex justify-content-end flex-grow-1 pe-3">
        <NavDropdown title="John Doe" align={{lg: 'end'}}>
          <NavDropdown.Item
            onClick={async () => {
              try {
                navigate('../', {replace: true})
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
            }}
          >
            Disconnect
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  )
}

function User() {
  return (
    <Navbar.Text className="d-flex justify-content-end pe-3">
      John Doe
    </Navbar.Text>
  )
}

function Documentation() {
  const navigate = useNavigate()

  return (
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="justify-content-end flex-grow-1 pe-3">
        <NavDropdown title="Documentation" align={{lg: 'end'}}>
          <NavDropdown.Item onClick={() => navigate('/docs/oauth')}>
            OAuth
          </NavDropdown.Item>
          <NavDropdown.Item onClick={() => navigate('/docs/session-token')}>
            Session Tokens
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  )
}
