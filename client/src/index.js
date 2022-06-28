import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import App from './App.js'
import NavBar from './NavBar.jsx'
import EmbedsHome from './EmbedsHome.jsx'
import CandidatesPage from './components/candidates/CandidatesPage.js'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <NavBar />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/embeds" element={<EmbedsHome />} />
      <Route path="/candidates" element={<CandidatesPage />} />
    </Routes>
  </BrowserRouter>,
)
