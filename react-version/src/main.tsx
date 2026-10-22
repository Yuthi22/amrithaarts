import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import '@fontsource/cinzel/400.css'
import '@fontsource/cinzel/500.css'
import '@fontsource/cinzel/600.css'
import '@fontsource/cormorant-garamond/500.css'
import '@fontsource/cormorant-garamond/600.css'
import '@fontsource/cormorant-garamond/700.css'
import '@fontsource/cormorant-garamond/700-italic.css'
import '@fontsource/great-vibes/400.css'
import '@fontsource/jost/400.css'
import '@fontsource/jost/400-italic.css'
import '@fontsource/jost/500.css'
import '@fontsource/jost/600.css'

import './styles/global.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
