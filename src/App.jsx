import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import MainLayout from './components/_layouts/MainLayout'
import Homepage from './pages/home/Homepage'
import Login from './pages/auth/Login'
import Profile from './pages/profile/Profile'
import Admin from './pages/admin/Admin'
import Detail from './pages/detail/Detail'
import Users from './pages/admin/users/Users'
import Authors from './pages/admin/authors/Authors'
import Books from './pages/admin/books/Books'
import Categories from './pages/admin/categories/Categories'
import Publishers from './pages/admin/publishers/Publishers'
import Loans from './pages/admin/loans/Loans'
import UserDetail from './pages/detail/user/UserDetail'


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
        path: "profile/",
        element: <Profile />
      },
      {
        path: "book-detail/:id",
        element: <Detail />
      },
      {
        path: "user-detail/:id",
        element: <UserDetail />
      },
      {
        path: "login/",
        element: <Login />
      },
    ]
  },
  {
    path: "/library",
    element: <Admin />,
    children: [
      {
        path: "books/",
        element: <Books />
      },
      {
        path: "users/",
        element: <Users />
      },
      {
        path: "categories/",
        element: <Categories />
      },
      {
        path: "authors/",
        element: <Authors />
      },
      {
        path: "publishers/",
        element: <Publishers />
      },
      {
        path: "loans/",
        element: <Loans />
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
