import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

const APP_ROUTE_SEGMENTS = new Set(['products', 'pay', 'order-number'])

function getRouterBaseName(pathname: string): string | undefined {
  const segments = pathname.split('/').filter(Boolean)

  if (segments.length > 0 && segments[segments.length - 1].includes('.')) {
    segments.pop()
  }

  if (segments.length > 0 && APP_ROUTE_SEGMENTS.has(segments[segments.length - 1])) {
    segments.pop()
  }

  if (segments.length === 0) {
    return undefined
  }

  return `/${segments.join('/')}`
}

const routerBaseName = getRouterBaseName(window.location.pathname)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={routerBaseName}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
