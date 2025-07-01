import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { checkAndTrackUTMParams } from './analytics'

// Check for UTM parameters on page load (Google Analytics tracks these automatically)
checkAndTrackUTMParams()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
