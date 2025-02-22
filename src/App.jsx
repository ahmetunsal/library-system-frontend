import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import MainLayout from './components/_layouts/MainLayout'
import Homepage from './pages/home/Homepage'
import Login from './pages/auth/Login'
import Profile from './pages/profile/Profile'
import Admin from './pages/admin/Admin'
import Categories from './pages/categories/Categories'
import Authors from './pages/authors/Authors'


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Homepage />
      },
      {
        path: "/profile",
        element: <Profile />
      },
      {
        path: "/admin",
        element: <Admin />
      },
      {
        path: "/categories",
        element: <Categories />
      },
      {
        path: "/authors",
        element: <Authors />
      },
      {
        path: "/login",
        element: <Login />
      },
    ]
  }
])


function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
