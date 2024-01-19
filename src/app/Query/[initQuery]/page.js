"use client"
import DefaultLayout from '@/Features/Layouts/DefaultLayouts/DefaultLayout'
import React, { useEffect, useState } from 'react'
import { MdEmail } from 'react-icons/md'
import { BsFilePersonFill } from "react-icons/bs"
import Link from 'next/link'
import { BiSolidContact } from "react-icons/bi"
import { useDispatch } from 'react-redux'
import { addQuery } from '@/store/Slices/AddQuery/addQuerySlice'
import { useParams, useRouter } from 'next/navigation'

const page = () => {
    const dispatch = useDispatch()
    const params = useParams()
    const router = useRouter()

    const { initQuery } = params

    const [addQueries, setAddQueries] = useState({ fullname: "", email: "", contact: "" })

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        const { fullname, email, contact } = addQueries
        dispatch(addQuery({ fullname, email, contact, initQuery }))
        setAddQueries({ fullname: "", email: "", contact: "" })

        router.push("/admin/AllOrders")
    }

    const handleOnChange = (e) => {
        setAddQueries({ ...addQueries, [e.target.name]: e.target.value })
    }

    return (
        <DefaultLayout>
            <div className='flex items-center justify-center'>
                <div className='border-[1px] border-blue-500 m-10 px-5 py-8 rounded-md shadow-xl shadow-blue-400'>
                    <div className='mb-5'>
                        <h1 className='font-bold text-xl text-blue-500 text-center'>Details</h1>
                    </div>

                    <div className=''>
                        <div className='flex items-center justify-between gap-5 my-2'>
                            <span className='text-blue-500 text-xl'>
                                <BsFilePersonFill />
                            </span>
                            <span>
                                <input onChange={handleOnChange} value={addQueries.fullname} type="text" name='fullname' id='fullname' placeholder='Fullname' className='outline-none border-b-2 border-blue-200 transition-all ease-in-out delay-100 hover:border-blue-400 px-2 py-2 text-sm' />
                            </span>
                        </div>
                        <div className='flex items-center justify-between gap-5 my-2'>
                            <span className='text-blue-500 text-xl'>
                                <MdEmail />
                            </span>
                            <span>
                                <input onChange={handleOnChange} value={addQueries.email} type="email" name='email' id='email' placeholder='Email' className='outline-none border-b-2 border-blue-200 transition-all ease-in-out delay-100 hover:border-blue-400 px-2 py-2 text-sm' />
                            </span>
                        </div>
                        <div className='flex items-center justify-between gap-5 my-2'>
                            <span className='text-blue-500 text-xl'>
                                <BiSolidContact />
                            </span>
                            <span>
                                <input onChange={handleOnChange} value={addQueries.contact} type="text" name='contact' id='contact' placeholder='Contact' className='outline-none border-b-2 border-blue-200 transition-all ease-in-out delay-100 hover:border-blue-400 px-2 py-2 text-sm' />
                            </span>
                        </div>
                        <div className='flex items-center justify-center mt-5'>
                            <button className='bg-blue-400 w-full py-2 rounded-md text-gray-100 font-semibold transition-all ease-in-out delay-100 hover:bg-blue-600' onClick={handleOnSubmit}>Contact</button>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    )
}

export default page