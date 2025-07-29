import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Importamos el MiniKitProvider
import { MiniKitProvider } from '@worldcoin/minikit-react'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MiniKitProvider>
      <App />
    </MiniKitProvider>
  </StrictMode>
)
