import React from 'react'
import Link from 'next/link'
import { RxDashboard, RxPerson } from 'react-icons/rx'
import { HiOutlineShoppingBag } from 'react-icons/hi'
import { FiSettings } from 'react-icons/fi'
import { FaHome } from 'react-icons/fa'

const Sidebar = ({ children }) => {
    return (
        <div className='flex'>
            <div className='fixed w-20 h-screen p-4 bg-blue-600 border-r-[1px] flex flex-col justify-between'>
                <div className='flex flex-col items-center'>
                    <Link href={'/admin'}>
                        <div className='bg-gray-100 hover:bg-blue-300 text-blue-500 p-3 rounded-lg inline-block'>
                            <FaHome size={20} />
                        </div>
                    </Link>
                    <span className='border-b-[1px] border-gray-300 w-full p-2 mb-2'></span>
                    <Link href={'/admin/AllProperties'}>
                        <div className='bg-gray-100 hover:bg-blue-300 text-blue-500 p-3 rounded-lg inline-block'>
                            <RxDashboard size={20} />
                        </div>
                    </Link>
                    <span className='border-b-[1px] border-gray-300 w-full p-2 mb-2'></span>
                    <Link href={'/admin/Users'}>
                        <div className='bg-gray-100 hover:bg-blue-300 text-blue-500 p-3 rounded-lg inline-block'>
                            <RxPerson size={20} />
                        </div>
                    </Link>
                    <span className='border-b-[1px] border-gray-300 w-full p-2 mb-2'></span>
                    <Link href={'/admin/AllOrders'}>
                        <div className='bg-gray-100 hover:bg-blue-300 text-blue-500 p-3 rounded-lg inline-block'>
                            <HiOutlineShoppingBag size={20} />
                        </div>
                    </Link>
                    <span className='border-b-[1px] border-gray-300 w-full p-2 mb-2'></span>
                    <Link href={'/admin/Myprofile'}>
                        <div className='bg-gray-100 hover:bg-blue-300 text-blue-500 p-3 rounded-lg inline-block'>
                            <FiSettings size={20} />
                        </div>
                    </Link>
                </div>
            </div>
            <main className='ml-20 w-full'>
                {children}
            </main>
        </div>
    )
}

export default Sidebar