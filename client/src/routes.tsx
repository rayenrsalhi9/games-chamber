import Home from './pages/home.tsx'
import Cart from './pages/cart.tsx'
import Register from './pages/register.tsx'
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
])

export default router