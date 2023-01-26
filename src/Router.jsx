import { createBrowserRouter } from 'react-router-dom'
import {
  Home,
  ErrorPage,
  User,
  Login,
  CreateAccount,
  Pruebas,
  Profile,
} from './Routes'

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
    path: '/login',
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/createaccount',
    element: <CreateAccount />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/pruebas',
    element: <Pruebas />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
])

export default router
