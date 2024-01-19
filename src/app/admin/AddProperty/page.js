"use client"
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import React, { useEffect, useState } from 'react'
import { conditionOfProperty } from '@/models/contstance/propertyConditionConstance'
import { airConditionStatus } from '@/models/contstance/airconditionConstance'
import { propertyStatus } from '@/models/contstance/propertyConstance'
import { useDispatch, useSelector } from 'react-redux'
import { addProperty } from '@/store/Slices/Properties/propertiesSlices'
import { getAllProperties } from '@/store/Slices/Properties/propertiesSlices'
import { useRouter } from "next/navigation"

const page = () => {
    const router = useRouter()
    const dispatch = useDispatch()

    const { loading } = useSelector((state => state.properties))

    const [addProperties, setAddProperties] = useState({ address: "", propertyType: "", price: "", title: "", rooms: "", baths: "", purpose: "", sqft: "", description: "", fullname: "", contact: "", email: "", coverVideo: "", condition: "", airCondition: "", balcony_or_terrace: "", gym_or_health_club: "", swimmingPool: "", jacuzzi: "", sauna: "", steam_Room: "", maintenance_staff: "", securityStaff: "", status: "" })

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        const { address, propertyType, price, title, rooms, baths, purpose, sqft, description, fullname, contact, email, coverVideo, condition, airCondition, balcony_or_terrace, gym_or_health_club, swimmingPool, jacuzzi, sauna, steam_Room, maintenance_staff, securityStaff, status } = addProperties

        dispatch(addProperty({ address, propertyType, price, title, rooms, baths, purpose, sqft, description, fullname, contact, email, coverVideo, condition, airCondition, balcony_or_terrace, gym_or_health_club, swimmingPool, jacuzzi, sauna, steam_Room, maintenance_staff, securityStaff, status }))

    }

    const handleOnchange = (e) => {
        setAddProperties({ ...addProperties, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        dispatch(getAllProperties())
        if (loading) {
            router.push("/admin/AllProperties")
        }
    }, [])

    return (
        <Sidebar>
            <Header />
            <div className='mt-28'>
                <form className="font-[sans-serif] m-6 max-w-4xl mx-auto" onSubmit={handleOnSubmit}>
                    <div className="grid sm:grid-cols-2 gap-10">
                        <div className="relative flex items-center">
                            <label className="text-[13px] bg-white text-gray-800 absolute px-2 top-[-10px] left-[18px] font-semibold">Title</label>
                            <input value={addProperties.title} onChange={handleOnchange} type="text" placeholder="Title"
                                className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none" name='title' />
                        </div>
                        <div className="relative flex items-center">
                            <label className="text-[13px] bg-white text-gray-800 absolute px-2 top-[-10px] left-[18px] font-semibold">Type</label>
                            <input value={addProperties.propertyType} onChange={handleOnchange} type="text" placeholder="Type"
                                className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none" name='propertyType' />
                        </div>
                        <div className="relative flex items-center">
                            <label className="text-[13px] bg-white text-gray-800 absolute px-2 top-[-10px] left-[18px] font-semibold">Price</label>
                            <input value={addProperties.price} onChange={handleOnchange} type="number" placeholder="Price"
                                className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none" name='price' />
                        </div>
                        <div className="relative flex items-center">
                            <label className="text-[13px] bg-white text-gray-800 absolute px-2 top-[-10px] left-[18px] font-semibold">Rooms</label>
                            <input value={addProperties.rooms} onChange={handleOnchange} type="number" placeholder="Rooms"
                                className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none" name='rooms' />
                        </div>
                        <div className="relative flex items-center">
                            <label className="text-[13px] bg-white text-gray-800 absolute px-2 top-[-10px] left-[18px] font-semibold">Bathrooms</label>
                            <input value={addProperties.baths} onChange={handleOnchange} type="number" placeholder="Bathrooms"
                                className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none" name='baths' />
                        </div>
                        <div className="relative flex items-center">
                            <label className="text-[13px] bg-white text-gray-800 absolute px-2 top-[-10px] left-[18px] font-semibold">Area</label>
                            <input value={addProperties.sqft} onChange={handleOnchange} type="number" placeholder="Area"
                                className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none" name='sqft' />
                        </div>
                        <div className="relative flex items-center">
                            <label className="text-[13px] bg-white text-gray-800 absolute px-2 top-[-10px] left-[18px] font-semibold">Video ID</label>
                            <input value={addProperties.coverVideo} onChange={handleOnchange} type="text" placeholder="Video ID"
                                className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none" name='coverVideo' />
                        </div>
                        <div className="relative flex items-center">
                            <label className="text-[13px] bg-white text-gray-800 absolute px-2 top-[-10px] left-[18px] font-semibold">For Purpose</label>
                            <select onChange={handleOnchange} value={addProperties.purpose} type="text" placeholder="Propose"
                                className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none" name='purpose'>
                                <option value="">--Select Option--</option>
                                <option value="For Rent">For Rent</option>
                                <option value="For Sale">For Sale</option>
                            </select>
                        </div>
                        <div className="relative flex items-center">
                            <label className="text-[13px] bg-white text-gray-800 absolute px-2 top-[-10px] left-[18px] font-semibold">Status</label>
                            <select onChange={handleOnchange} value={addProperties.status} type="text" placeholder="Status"
                                className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none" name='status' >
                                <option value="">--Select Option--</option>
                                <option value={propertyStatus.idle}>Idle</option>
                                <option value={propertyStatus.onRent}>On Rent</option>
                                <option value={propertyStatus.sold}>Sold</option>
                            </select>
                        </div>
                        <div className="relative flex items-center sm:col-span-2">
                            <label className="text-[13px] bg-white text-gray-800 absolute px-2 top-[-10px] left-[18px] font-semibold">Description</label>

                            <textarea onChange={handleOnchange} value={addProperties.description} name="description" id="" cols="30" rows="3" className='px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none'></textarea >
                        </div>
                        <div className="relative flex items-center sm:col-span-2">
                            <label
                                className="text-[13px] bg-white text-gray-800 absolute px-2 top-[-10px] left-[18px] font-semibold">Address</label>
                            <textarea value={addProperties.address} onChange={handleOnchange} name="address" id="" cols="30" rows="3" className='px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none'></textarea >
                        </div>
                        <div className="relative flex items-center justify-between px-10 text-[13px] font-semibold text-gray-800 w-full">
                            <div>
                                <h1 className='text-[15px] text-blue-700'>Condition</h1>
                            </div>
                            <div className='flex flex-col items-end'>
                                <div className='flex items-center gap-2'>
                                    <label htmlFor="condition">Furnished</label>
                                    <input onChange={handleOnchange} type="radio" name='condition' value={conditionOfProperty.furnished} />
                                </div>
                                <div className='flex items-center gap-2'>
                                    <label htmlFor="condition">Semi-furnished</label>
                                    <input onChange={handleOnchange} type="radio" name='condition' value={conditionOfProperty.semi_furnished} />
                                </div>
                                <div className='flex items-center gap-2'>
                                    <label htmlFor="condition">Un-furnished</label>
                                    <input onChange={handleOnchange} type="radio" name='condition' value={conditionOfProperty.un_furnished} />
                                </div>
                            </div>
                        </div>
                        <div className="relative flex items-center justify-between px-10 text-[13px] font-semibold text-gray-800 w-full">
                            <div>
                                <h1 className='text-[15px] text-blue-700'>Air Condition</h1>
                            </div>
                            <div className='flex flex-col items-end'>
                                <div className='flex items-center gap-2 my-2'>
                                    <label htmlFor="condition">Centrally Controlled</label>
                                    <input onChange={handleOnchange} type="radio" name='airCondition' value={airConditionStatus.centrally} />
                                </div>
                                <div className='flex items-center gap-2'>
                                    <label htmlFor="condition">Own Controlled</label>
                                    <input onChange={handleOnchange} type="radio" name='airCondition' value={airConditionStatus.own} />
                                </div>
                            </div>
                        </div>
                        <div className="relative flex items-center justify-between px-10 text-[13px] font-semibold text-gray-800 w-full">
                            <div>
                                <h1 className='text-[15px] text-blue-700'>View</h1>
                            </div>
                            <div className='flex flex-col items-end'>
                                <div className='flex items-center gap-2 my-2'>
                                    <label htmlFor="balcony_or_terrace">Balcony</label>
                                    <input onChange={handleOnchange} type="radio" name='balcony_or_terrace' value={"Balcony"} />
                                </div>
                                <div className='flex items-center gap-2'>
                                    <label htmlFor="balcony_or_terrace">Terrace</label>
                                    <input onChange={handleOnchange} type="radio" name='balcony_or_terrace' value={"Terrace"} />
                                </div>
                            </div>
                        </div>
                        <div className="relative flex items-center justify-between px-10 text-[13px] font-semibold text-gray-800 w-full">
                            <div>
                                <h1 className='text-[15px] text-blue-700'>Gym or Health</h1>
                            </div>
                            <div className='flex flex-col items-end'>
                                <div className='flex items-center gap-2 my-2'>
                                    <label htmlFor="gym_or_health_club">Gym or Health</label>
                                    <input onChange={handleOnchange} type="checkbox" name='gym_or_health_club' value={"Gym or Health Club"} />
                                </div>
                            </div>
                        </div>
                        <div className="relative flex items-center justify-between px-10 text-[13px] font-semibold text-gray-800 w-full">
                            <div>
                                <h1 className='text-[15px] text-blue-700'>Swimming Pool</h1>
                            </div>
                            <div className='flex flex-col items-end'>
                                <div className='flex items-center gap-2 my-2'>
                                    <label htmlFor="swimmingPool">Swimming Pool</label>
                                    <input onChange={handleOnchange} type="checkbox" name='swimmingPool' value={"Swimming Pool"} />
                                </div>
                            </div>
                        </div>
                        <div className="relative flex items-center justify-between px-10 text-[13px] font-semibold text-gray-800 w-full">
                            <div>
                                <h1 className='text-[15px] text-blue-700'>Jacuzzi</h1>
                            </div>
                            <div className='flex flex-col items-end'>
                                <div className='flex items-center gap-2 my-2'>
                                    <label htmlFor="jacuzzi">Jacuzzi</label>
                                    <input onChange={handleOnchange} type="checkbox" name='jacuzzi' value={"Jacuzzi"} />
                                </div>
                            </div>
                        </div>
                        <div className="relative flex items-center justify-between px-10 text-[13px] font-semibold text-gray-800 w-full">
                            <div>
                                <h1 className='text-[15px] text-blue-700'>Sauna</h1>
                            </div>
                            <div className='flex flex-col items-end'>
                                <div className='flex items-center gap-2 my-2'>
                                    <label htmlFor="sauna">Sauna</label>
                                    <input onChange={handleOnchange} type="checkbox" name='sauna' value={"Sauna"} />
                                </div>
                            </div>
                        </div>
                        <div className="relative flex items-center justify-between px-10 text-[13px] font-semibold text-gray-800 w-full">
                            <div>
                                <h1 className='text-[15px] text-blue-700'>Steam Room</h1>
                            </div>
                            <div className='flex flex-col items-end'>
                                <div className='flex items-center gap-2 my-2'>
                                    <label htmlFor="steam_Room">Steam Room</label>
                                    <input onChange={handleOnchange} type="checkbox" name='steam_Room' value={"Steam Room"} />
                                </div>
                            </div>
                        </div>
                        <div className="relative flex items-center justify-between px-10 text-[13px] font-semibold text-gray-800 w-full">
                            <div>
                                <h1 className='text-[15px] text-blue-700'>Maintenance Staff</h1>
                            </div>
                            <div className='flex flex-col items-end'>
                                <div className='flex items-center gap-2 my-2'>
                                    <label htmlFor="maintenance_staff">Maintenance Staff</label>
                                    <input onChange={handleOnchange} type="checkbox" name='maintenance_staff' value={"Maintenance Staff"} />
                                </div>
                            </div>
                        </div>
                        <div className="relative flex items-center justify-between px-10 text-[13px] font-semibold text-gray-800 w-full">
                            <div>
                                <h1 className='text-[15px] text-blue-700'>Security Staff</h1>
                            </div>
                            <div className='flex flex-col items-end'>
                                <div className='flex items-center gap-2 my-2'>
                                    <label htmlFor="securityStaff">Security Staff</label>
                                    <input onChange={handleOnchange} type="checkbox" name='securityStaff' value={"Security Staff"} />
                                </div>
                            </div>
                        </div>
                        <div className="relative flex flex-col items-center sm:col-span-2 w-full gap-3">
                            <div className='my-4'>
                                <h1 className='text-[15px] font-bold text-blue-700  my-3'>Owner Details</h1>
                            </div>
                            <div className='flex'>
                                <div className="relative flex items-center">
                                    <label className="text-[13px] bg-white text-gray-800 absolute px-2 top-[-10px] left-[18px] font-semibold">Fullname</label>
                                    <input value={addProperties.fullname} onChange={handleOnchange} type="text" placeholder="Fullname"
                                        className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none" name='fullname' />
                                </div>
                                <div className="relative flex items-center">
                                    <label className="text-[13px] bg-white text-gray-800 absolute px-2 top-[-10px] left-[18px] font-semibold">Email</label>
                                    <input value={addProperties.email} onChange={handleOnchange} type="email" placeholder="Email"
                                        className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none" name='email' />
                                </div>
                                <div className="relative flex items-center">
                                    <label className="text-[13px] bg-white text-gray-800 absolute px-2 top-[-10px] left-[18px] font-semibold">Contact</label>
                                    <input value={addProperties.contact} onChange={handleOnchange} type="text" placeholder="Contact"
                                        className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none" name='contact' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="submit"
                        className="mt-8 px-6 py-2.5 w-full text-sm font-semibold bg-blue-500 text-white rounded hover:bg-blue-600">Submit</button>
                </form>
            </div>
        </Sidebar >
    )
}

export default page