import React from 'react'
import { Link } from 'react-router'
import BookCards from '../../components/cards/home/BookCards'

const HomeLayout = () => {
  return (
    <div className="flex flex-col">
      <BookCards />
      <BookCards />
      <BookCards />
      <BookCards />
      <BookCards />
    </div>
  )
}

export default HomeLayout