import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import '../css/index.css'
import App from './App.jsx'
import Cadastro from './Cadastro.jsx'
import Home from './Home.jsx'

// Mantendo apenas a rota inicial do seu App para não gerar erros
const router = createBrowserRouter([
  //depois tem que criar uma  pagina para erro 404
  {
    path: '/',
    element: <App />,
    
  },
  {
    path: '/cadastro',
    element: <Cadastro />,
  }
  ,
   {
    path: '/home',
    element: <Home />,
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
