import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import '../css/index.css'
import App from './App.jsx'
import Cadastro from './Cadastro.jsx'
import Home from './Home.jsx'
import Users from './Users.jsx'
import Books from './Books.jsx'
import Loans from './Loans.jsx'

const router = createBrowserRouter([
  //depois tem que criar uma  pagina para erro 404
  {
    path: '/',
    element: <App />,
    
  },
    {
    path: '',
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
  },
  {
    path: '/users',
    element: <Users />,
  },
  {
    path: '/books',
    element: <Books />,
  },
  {
    path: '/loans',
    element: <Loans />,
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
