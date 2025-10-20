import Home from './pages/home.tsx'
import Cart from './pages/cart.tsx'
import Register from './pages/register.tsx'
import Login from './pages/login.tsx'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/cart',
    element: <Cart />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login />,
  },
])

export default router