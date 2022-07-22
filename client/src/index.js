import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.js'
import './styles/index.css'
import {QueryClientProvider} from 'react-query'
import queryClient from './QueryClient.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
)
