import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { BrowserRouter } from 'react-router-dom'
import Portfolio from './pages/Portfolio.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
   <Portfolio/>
    </BrowserRouter>
  </StrictMode>,
)
