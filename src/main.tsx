import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import LocationProvider from './context/Context.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LocationProvider>
    <App />
    </LocationProvider>
  </StrictMode>,
)
