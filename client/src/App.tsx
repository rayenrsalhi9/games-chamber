import router from './routes.tsx'
import { RouterProvider } from 'react-router-dom'

const App = () => {
  return <RouterProvider router={router} />
}

export default App