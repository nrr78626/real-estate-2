"use client"
import React, { useEffect } from 'react'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import { useDispatch } from 'react-redux'
import { getCurrentProfile } from '@/store/Slices/AddUser/addUserSlice'

const page = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getCurrentProfile())
  },[])
  return (
    <>
      <Sidebar>
        <Header />
      </Sidebar>
    </>
  )
}

export default page