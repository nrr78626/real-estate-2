"use client"
import React, { useState, useEffect } from 'react'
import DefaultLayout from '@/Features/Layouts/DefaultLayouts/DefaultLayout'
import { FaUserCircle } from "react-icons/fa"
import { MdEmail } from "react-icons/md"
import { BsFillTelephoneFill } from "react-icons/bs"
import { RiLockPasswordFill } from "react-icons/ri"
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '@/store/Slices/AddUser/addUserSlice'
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation'
import { showUsers } from '@/store/Slices/AddUser/addUserSlice'

const page = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const { loading, success, msg, error } = useSelector(state => state.addUser)
    const [signup, setSignup] = useState({ fullname: "", email: "", contact: "", password: "", cpassword: "" })

    const handleOnClick = async (e) => {
        e.preventDefault()
        const { fullname, email, contact, password } = signup
        dispatch(addUser({ fullname, email, contact, password }))
        setSignup({ fullname: "", email: "", contact: "", password: "", cpassword: "" })
    }

    const handleOnChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        if (success) {
            toast.success(msg, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                pauseOnFocusLoss: false
            })
            router.push("/")
        } else {
            toast.error(error, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                pauseOnFocusLoss: false
            })
        }
    }, [loading])

    useEffect(() => {
        dispatch(showUsers())
    }, [])
    return (
        <>
            <ToastContainer />
            <DefaultLayout>
                <div className='flex items-center justify-center'>
                    <div className='border-[1px] border-blue-500 m-10 px-5 py-8 rounded-md shadow-xl shadow-blue-400'>
                        <div className='mb-5'>
                            <h1 className='font-bold text-xl text-blue-600 text-center'>Signup</h1>
                        </div>
                        <form onSubmit={handleOnClick}>
                            <div className=''>
                                <div className='flex items-center justify-between gap-5 my-2 transition-all ease-in-out delay-100'>
                                    <span className='text-blue-500 text-xl'>
                                        <FaUserCircle />
                                    </span>
                                    <span>
                                        <input type="text" name='fullname' id='fullname' placeholder='Fullname' className='outline-none border-b-2 border-blue-200 transition-all ease-in-out delay-100 hover:border-blue-400 px-2 py-2 text-sm' onChange={handleOnChange} value={signup.fullname} required />
                                    </span>
                                </div>
                                <div className='flex items-center justify-between gap-5 my-2'>
                                    <span className='text-blue-500 text-xl'>
                                        <MdEmail />
                                    </span>
                                    <span>
                                        <input type="email" name='email' id='email' placeholder='Email' className='outline-none border-b-2 border-blue-200 transition-all ease-in-out delay-100 hover:border-blue-400 px-2 py-2 text-sm' onChange={handleOnChange} value={signup.email} required />
                                    </span>
                                </div>
                                <div className='flex items-center justify-between gap-5 my-2'>
                                    <span className='text-blue-500 text-xl'>
                                        <BsFillTelephoneFill />
                                    </span>
                                    <span>
                                        <input type="text" name='contact' id='contact' placeholder='Contact' className='outline-none border-b-2 border-blue-200 transition-all ease-in-out delay-100 hover:border-blue-400 px-2 py-2 text-sm' onChange={handleOnChange} value={signup.contact} required />
                                    </span>
                                </div>
                                <div className='flex items-center justify-between gap-5 my-2'>
                                    <span className='text-blue-500 text-xl'>
                                        <RiLockPasswordFill />
                                    </span>
                                    <span>
                                        <input type="password" name='password' id='password' placeholder='Password' className='outline-none border-b-2 border-blue-200 transition-all ease-in-out delay-100 hover:border-blue-400 px-2 py-2 text-sm' onChange={handleOnChange} value={signup.password} required />
                                    </span>
                                </div>
                                <div className='flex items-center justify-between gap-5 my-2'>
                                    <span className='text-blue-500 text-xl'>
                                        <RiLockPasswordFill />
                                    </span>
                                    <span>
                                        <input type="password" name='cpassword' id='cpassword' placeholder='Confirm Password' className='outline-none border-b-2 border-blue-200 transition-all ease-in-out delay-100 hover:border-blue-400 px-2 py-2 text-sm' onChange={handleOnChange} value={signup.cpassword} required />
                                    </span>
                                </div>
                                <div className='text-sm mt-4 text-red-500 font-bold text-center'>
                                    <span className={signup.password != signup.cpassword ? "opacity-100" : "opacity-0"}>Password not matched</span>
                                </div>
                                <div className='flex items-center justify-center mt-5'>
                                    <button className='bg-blue-400 w-full py-2 rounded-md text-gray-100 font-semibold transition-all ease-in-out delay-100 hover:bg-blue-600' type='submit' >Submit</button>
                                </div>
                                <div className='mt-2'>
                                    <span className='text-sm font-semibold text-gray-600'>Already have an account ? <Link href={"/GetAccess"} className='font-bold text-green-600'>Login</Link> </span>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </DefaultLayout>
        </>
    )
}

export default page