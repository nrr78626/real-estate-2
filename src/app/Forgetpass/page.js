"use client"
import React from 'react'
import DefaultLayout from '@/Features/Layouts/DefaultLayouts/DefaultLayout'
import {useSearchParams} from "next/navigation"

const page = () => {
    const token = useSearchParams().get("token")
    return (
        <>
            <DefaultLayout>
                <div className='flex justify-center items-center'>
                    {token && <div className='py-10 border-2 border-blue-400 px-5 my-12 rounded-md'>
                        <div className=''>
                            <h1 className='text-center font-bold mb-10 text-blue-600'>Set Password</h1>
                            <div className=''>
                                <div className='flex flex-col gap-1 my-4'>
                                    <label htmlFor="password" className='font-semibold text-blue-600 text-sm' >Password</label>
                                    <input type="password" placeholder='Password' id='forgetpass' name='password' className='outline-none bg-blue-100 py-2 px-3 text-gray-700 text-sm font-semibold border-b-2 hover:border-blue-600 focus:border-blue-600' />
                                </div>
                                <div className='flex flex-col gap-1 my-4'>
                                    <label htmlFor="cpassword" className='font-semibold text-blue-600 text-sm' >Confirm Password</label>
                                    <input type="password" placeholder='Confirm Password' id='cpassword' name='cpassword' className='outline-none bg-blue-100 py-2 px-3 text-gray-700 text-sm font-semibold border-b-2 hover:border-blue-600 focus:border-blue-600' />
                                </div>
                                <div className='mt-8 w-full'>
                                    <button type='submit' className='bg-blue-600 text-white py-2 px-5 rounded-sm transition-all hover:bg-blue-800 w-full'>Confirm</button>
                                </div>
                            </div>
                        </div>
                    </div>}

                    {!token && <div className='py-10 border-2 border-blue-400 px-5 my-12 rounded-md'>
                        <div>
                            <h1 className='text-center font-bold mb-10 text-blue-600'>Forget Password</h1>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor="forgetpass" className='font-semibold text-blue-600 text-sm' >Email</label>
                                <input type="email" placeholder='Enter Email' id='forgetpass' className='outline-none bg-blue-100 py-2 px-3 text-gray-700 text-sm font-semibold border-b-2 hover:border-blue-600 focus:border-blue-600' />
                            </div>
                            <div className='mt-8 w-full'>
                                <button type='submit' className='bg-blue-600 text-white py-2 px-5 rounded-sm transition-all hover:bg-blue-800 w-full'>Forget</button>
                            </div>
                        </div>
                    </div>}
                </div>
            </DefaultLayout>
        </>
    )
}

export default page
