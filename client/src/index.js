import ReactDOM from 'react-dom/client'
import OAuthApp from './components/OAuthApp.js'
import './styles/index.css'
import {QueryClientProvider} from 'react-query'
import queryClient from './QueryClient.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <OAuthApp />
  </QueryClientProvider>,
)
