import {useState, useEffect} from 'react'
import Candidates from './Candidates'

function ConnectToCheckr() {
  return (
    <div className="container-fluid">
      <div className="my-5">
        <div className="p-5 mb-4 bg-light rounded-3">
          <div className="container-fluid py-5">
            <h1 className="display-5 fw-bold">Acme HR + Checkr</h1>
            <p className="col-md-8 fs-4 mb-5">
              Connect your Acme HR account with Checkr to run background checks.
            </p>
            <button className="btn btn-primary btn-lg" type="button">
              Connect to Checkr
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const fetchFirstAccount = async () => {
  return fetch('/api/accounts').then(async response => {
    const accounts = await response.json()
    if (accounts.length > 0) {
      return accounts[0]
    } else {
      return null
    }
  }, console.error)
}

function App() {
  const [account, setAccount] = useState(null)
  useEffect(() => {
    fetchFirstAccount().then(a => {
      setAccount(a)
    })
  }, [])

  return (
    <div className="App">{account ? <Candidates /> : <ConnectToCheckr />}</div>
  )
}

export default App
