"use client"
import React, { useEffect, useState } from 'react'
import DefaultLayout from '@/Features/Layouts/DefaultLayouts/DefaultLayout'
import { RiLockPasswordFill } from "react-icons/ri"
import { MdEmail } from "react-icons/md"
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '@/store/Slices/LoginSlice/loginSlice'
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation'
import { Vortex } from 'react-loader-spinner'

const page = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const { loginStatus, loading } = useSelector(state => state.login)

    const [login, setLogin] = useState({ email: "", password: "" })

    const handleOnSubmit = (e) => {
        const { email, password } = login
        e.preventDefault()
        dispatch(loginUser({ email, password }))
        setLogin({ email: "", password: "" })
    }

    const handleOnChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        if (loginStatus.success) {
            toast.success(loginStatus.msg, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                pauseOnFocusLoss:false
            })
            router.push("/admin")
        } else {
            toast.error(loginStatus.msg, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                pauseOnFocusLoss:false
            })
        }
    }, [loading])

    return (
        <>
            <ToastContainer />
            <DefaultLayout>
                <div className='flex items-center justify-center'>
                    <div className='border-[1px] border-blue-500 m-10 px-5 py-8 rounded-md shadow-xl shadow-blue-400'>
                        <div className='mb-5'>
                            <h1 className='font-bold text-xl text-blue-600 text-center'>Login</h1>
                        </div>
                        {loading && <Vortex
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="vortex-loading"
                            wrapperStyle={{}}
                            wrapperClass="vortex-wrapper"
                            colors={['#007FFF', '#007FFF', '#007FFF', '#007FFF', '#007FFF', '#007FFF']}
                        />}
                        {!loading && <div className=''>
                            <div className='flex items-center justify-between gap-5 my-2'>
                                <span className='text-blue-500 text-xl'>
                                    <MdEmail />
                                </span>
                                <span>
                                    <input onChange={handleOnChange} value={login.email} type="email" name='email' id='email' placeholder='Email' className='outline-none border-b-2 border-blue-200 transition-all ease-in-out delay-100 hover:border-blue-400 px-2 py-2 text-sm' />
                                </span>
                            </div>
                            <div className='flex items-center justify-between gap-5 my-2'>
                                <span className='text-blue-500 text-xl'>
                                    <RiLockPasswordFill />
                                </span>
                                <span>
                                    <input onChange={handleOnChange} value={login.password} type="password" name='password' id='password' placeholder='Password' className='outline-none border-b-2 border-blue-200 transition-all ease-in-out delay-100 hover:border-blue-400 px-2 py-2 text-sm' />
                                </span>
                            </div>
                            <div className='flex items-center justify-center mt-5'>
                                <button className='bg-blue-400 w-full py-2 rounded-md text-gray-100 font-semibold transition-all ease-in-out delay-100 hover:bg-blue-600' onClick={handleOnSubmit}>Login</button>
                            </div>
                            <div className='mt-2'>
                                <span className='text-sm font-semibold text-gray-600'>Don't have an account ? <Link href={"/Signup"} className='font-bold text-green-600'>Signup</Link> </span>
                            </div>
                        </div>}
                    </div>
                </div>
            </DefaultLayout>
        </>
    )
}

export default page