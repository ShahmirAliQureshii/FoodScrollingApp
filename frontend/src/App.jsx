import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/general/Home'
import ErrorPage from './pages/ErrorPage'
import AppLayout from './Components/Layout/AppLayout'
// ...existing code...
import UserRegister from './pages/auth/UserRegister'
import UserLogin from './pages/auth/UserLogin'
import PartnerRegister from './pages/auth/PartnerRegister'
import PartnerLogin from './pages/auth/PartnerLogin'
import CreateFood from './pages/food-partner/CreateFood'
import Profile from './pages/food-partner/Profile'

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <AppLayout/>,
      errorElement: <ErrorPage/>,
      children: [
        {
          path: '/',
          element: <Home/>
        },
        {
          path: 'user/register',
          element: <UserRegister/>
        },
        {
          path: 'user/login',
          element: <UserLogin/>
        },
        {
          path: 'partner/register',
          element: <PartnerRegister/>
        },
        {
          path: 'partner/login',
          element: <PartnerLogin/>
        },
        {
          path: 'create-food',
          element: <CreateFood/>
        },
        {
          path: 'food-partner/:profile',
          element: <Profile/>
        }
      ]
    }
  ])

  return <RouterProvider router={router}></RouterProvider>
}

export default App