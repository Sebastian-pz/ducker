import { createBrowserRouter } from 'react-router-dom'
import { Home, ErrorPage, User } from './Routes'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/user/:id',
    element: <User />,
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
])

export default router
