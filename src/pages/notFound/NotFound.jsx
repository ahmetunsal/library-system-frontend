import React from 'react'

const NotFound = () => {
  return (
    <div className='h-screen bg-center bg-no-repeat bg-cover flex flex-col relative pt-44 md:pt-32 ps-2 items-center' style={{ backgroundImage: "url('/404.jpg')" }}>
        <h1 className='text-9xl md:text-[12em] text-yellow-500 drop-shadow-[0_0_10px]'>404</h1>
    </div>
  )
}

export default NotFound