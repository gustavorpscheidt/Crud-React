import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import '../css/index.css'
import App from './App.jsx'

// Mantendo apenas a rota inicial do seu App para não gerar erros
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
