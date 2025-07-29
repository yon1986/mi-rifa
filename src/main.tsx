import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { MiniKit } from '@worldcoin/minikit-js'

// Por ahora solo importamos MiniKit. 
// Luego lo usaremos en los componentes para llamar funciones como login o transacciones.

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
