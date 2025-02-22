import React from 'react'
import Navigation from '../navigation/Navigation'
import { Outlet } from 'react-router'

const MainLayout = () => {
  return (
    <div className=''>
        <Navigation />
        <Outlet />
    </div>
  )
}

export default MainLayout