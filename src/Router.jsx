import { createBrowserRouter } from 'react-router-dom'
import {
  Home,
  ErrorPage,
  User,
  Login,
  CreateAccount,
  Pruebas,
  Profile,
  Search,
  CuackThread,
  MyNotifications,
  Saved,
} from './Routes'
import InfiniteScrollComponent from './Components/InfiniteScroll/InfiniteScroll'

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
    path: '/profile/:id',
    element: <Profile />,
  },
  {
    path: '/search',
    element: <Search />,
  },
  {
    path: '/cuack/:cuackID',
    element: <CuackThread />,
  },
  {
    path: '/notifications',
    element: <MyNotifications />,
  },
  {
    path: '/scroll',
    element: <InfiniteScrollComponent />,
  },
  {
    path: '/saved',
    element: <Saved />,
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
])

export default router
