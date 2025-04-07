import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { TransactionProvider } from './client/component/TransactionProvider.jsx'
import UserProvider from './client/component/UserProvider.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <TransactionProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </TransactionProvider>
    </UserProvider>
  </StrictMode>,
)
