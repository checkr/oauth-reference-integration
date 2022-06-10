import logo from './logo.png'

function DisconnectDropdown() {
  return (
    <div className="dropdown text-end mx-4">
      <a
        href="#"
        className="d-block text-decoration-none dropdown-toggle text-white"
        data-bs-toggle="dropdown"
      >
        Settings
      </a>
      <ul className="dropdown-menu dropdown-menu-end">
        <li>
          <a className="dropdown-item" href="#">
            Disconnect Checkr
          </a>
        </li>
      </ul>
    </div>
  )
}

export default function NavBar() {
  // TODO: showSettings = true
  const showSettings = false
  return (
    <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow py-2">
      <a
        className="navbar-brand col-md-3 col-lg-2 d-flex align-items-center"
        href="/"
      >
        <img src={logo} className="logo" />
        <span className="px-1">Acme HR</span>
      </a>

      {showSettings ? <DisconnectDropdown /> : null}
    </header>
  )
}
