import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import App from './App'
import NavBar from './NavBar'
import EmbedsHome from './EmbedsHome'
import Candidates from './Candidates'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/embeds" element={<EmbedsHome />} />
        <Route path="/candidates" element={<Candidates />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
