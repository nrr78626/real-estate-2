"use client"
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { showUsers } from '@/store/Slices/AddUser/addUserSlice'
import { roles } from '@/models/contstance/userConstaants'
import Image from 'next/image'
import { AiFillDelete } from "react-icons/ai"
import { BiEdit } from "react-icons/bi"
import { useDisclosure } from "@chakra-ui/react"
import Modal from '@/components/UserModal'
import { useSearchParams } from "next/navigation"
import DeleteUserAlert from '@/components/DeleteUserAlert'

const page = () => {
    const dispatch = useDispatch()

    const [showAlert, setShowAlert] = useState(false)

    const { addedUser } = useSelector((state) => state?.addUser)

    const { isOpen, onClose, onOpen } = useDisclosure()



    useEffect(() => {
        dispatch(showUsers())
    }, [])

    useEffect(() => {

    }, [addedUser])

    return (
        <Sidebar>
            <Header />
            <div className='z-10'>
                <section className="text-gray-600 body-font">
                    <div className="container px-5 py-24 mx-auto">
                        <div className="flex flex-wrap -m-4">
                            {addedUser?.users && addedUser.users.map((x) => (
                                <div className="lg:w-1/4 md:w-1/2 p-4 w-full" key={x._id}>
                                    <Link href={`?current_user_id=${x._id}`} className='' legacyBehavior>
                                        <div className='cursor-pointer'>
                                            <a className="block relative h-48 rounded overflow-hidden">
                                                <Image alt="triviska" className="object-cover object-center w-full h-full block" src={x?.userPic ? `/userPic/${x.userPic}` : "/userPic/defaultuser.png"} height={1000} width={1000} quality={75} priority={true} />
                                            </a>
                                            <div className="mt-4">
                                                {x.role == roles.user && <span className={`text-red-600 text-xs tracking-widest title-font mb-1 bg-red-300 px-2 py-1 font-bold rounded`}>{x.role}</span>}
                                                {x.role == roles.moderator && <span className={`text-yellow-600 text-xs tracking-widest title-font mb-1 bg-yellow-300 px-2 py-1 font-bold rounded`}>{x.role}</span>}
                                                {x.role == roles.admin && <span className={`text-green-600 text-xs tracking-widest title-font mb-1 bg-green-300 px-2 py-1 font-bold rounded`}>{x.role}</span>}
                                                {x.role == roles.superuser && <span className={`text-blue-600 text-xs tracking-widest title-font mb-1 bg-blue-300 px-2 py-1 font-bold rounded`}>{x.role}</span>}
                                                <h2 className="text-gray-900 title-font text-sm font-medium">{x.fullname}</h2>
                                                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{x.contact}</h3>
                                                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{x.email}</h3>
                                            </div>
                                            <div className='flex justify-between items-center bg-blue-100 py-2 rounded-sm'>
                                                <div className='px-5 flex justify-between'>
                                                    <BiEdit className='text-xl text-green-600 cursor-pointer' onClick={onOpen} />
                                                    <Modal isOpen={isOpen} onClose={onClose} />
                                                </div>
                                                <div className='px-5 flex justify-between'>
                                                    <AiFillDelete className='text-xl text-red-600 cursor-pointer' onClick={() => { setShowAlert(!showAlert) }} />
                                                    <DeleteUserAlert showAlert={showAlert} setShowAlert={setShowAlert} />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </Sidebar>
    )
}

export default page