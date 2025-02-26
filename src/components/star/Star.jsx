import React from 'react'
import { FaRegStar, FaStar } from 'react-icons/fa'
import { outOfArray } from '../../utils/config'


const filledStar = <FaStar className='w-5 h-auto' color='gold' />
const star = <FaRegStar className='w-5 h-auto' color='gold' />



const Star = ({ starCount }) => {
    return (
    <div className='flex'>
        {
            outOfArray.map((s,i) => {
                const isStar = (i+1) <= starCount; 
                return (
                    isStar ? filledStar : star
                )
            })
        }
    </div>
  )
}

export default Star