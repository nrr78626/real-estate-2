import React, { useEffect } from 'react'
import { getCurrentProfile } from '@/store/Slices/AddUser/addUserSlice'
import { useDispatch, useSelector } from 'react-redux'

const Header = () => {
  const dispatch = useDispatch()

  const { currentUser } = useSelector((state) => state.addUser)

  useEffect(() => {
    dispatch(getCurrentProfile())
  }, [])

  return (
    <div className='flex justify-between text-sm px-6 py-3 bg-blue-600 text-gray-100 font-semibold fixed left-[80px] top-0 right-0 z-50'>
      <h1>Dashboard</h1>
      <div>
        <span className='px-2'>Welcome back,</span>
        <span>{currentUser?.user?.fullname}</span>
      </div>
    </div>
  )
}

export default Header