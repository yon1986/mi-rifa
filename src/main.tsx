import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Inicializamos el MiniKit de World App
import { MiniKit } from '@worldcoin/minikit-js'

MiniKit.init({
  appId: "mi-rifa", // Puedes usar tu ID de la app (lo ves en el dashboard de World App)
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
