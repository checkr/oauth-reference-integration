import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import AccountPage from './components/account/AccountPage.js'
import SessionToken from './components/docs/SessionToken.js'
import OAuth from './components/docs/OAuth.js'
import './styles/index.css'
import {QueryClient, QueryClientProvider} from 'react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AccountPage />} />
        <Route path="/docs/session-token" element={<SessionToken />} />
        <Route path="/docs/oauth" element={<OAuth />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>,
)
