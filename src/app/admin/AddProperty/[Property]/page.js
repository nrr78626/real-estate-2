"use client"
import React, { useEffect, useState } from 'react'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import { propertyStatus } from '@/models/contstance/propertyConstance'
import { conditionOfProperty } from '@/models/contstance/propertyConditionConstance'
import { airConditionStatus } from '@/models/contstance/airconditionConstance'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProperties } from '@/store/Slices/Properties/propertiesSlices'
import { useParams, useRouter } from 'next/navigation'
import { updatePropertyDetail } from '@/store/Slices/Properties/propertiesSlices'
import { parseCookies } from 'nookies'

const page = () => {
    const dispatch = useDispatch()
    const params = useParams()
    const router = useRouter()
    const { properties } = useSelector(state => state.properties)
    const { Property } = params

    const [updatePropertyDetails, setUpdatePropertyDetails] = useState({
        purpose: "", propertyType: "", title: "", address: "", rooms: "", baths: "", price: "", sqft: "", description: "", coverVideo: "", email: "", mobile: "", fullname: "", status: "", condition: "", airCondition: "", balcony_or_terrace: "", gym_or_health_club: "", swimmingPool: "", jacuzzi: "", sauna: "", steam_Room: "", maintenance_staff: "", securityStaff: "",
    })


    const currentProperty = properties?.filter((e) => {
        return e._id == Property
    })

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        const { purpose, propertyType, title, address, rooms, baths, price, sqft, description, coverVideo, email, mobile, fullname, status, condition, airCondition, balcony_or_terrace, gym_or_health_club, swimmingPool, jacuzzi, sauna, steam_Room, maintenance_staff, securityStaff } = updatePropertyDetails

        dispatch(updatePropertyDetail({ purpose, propertyType, title, address, rooms, baths, price, sqft, description, condition, airCondition, balcony_or_terrace, gym_or_health_club, swimmingPool, jacuzzi, sauna, steam_Room, maintenance_staff, securityStaff, coverVideo, email, mobile, fullname, Property, status, condition, airCondition, balcony_or_terrace, gym_or_health_club, swimmingPool, jacuzzi, sauna, steam_Room, maintenance_staff, securityStaff }))

        router.push("/admin/AllProperties")

    }

    const handleOnClickCoverPhoto = async (e) => {
        e.preventDefault()
        const { authtoken } = parseCookies()
        const formData = new FormData()
        const fileField = document.querySelector('input[type="file"]')
        formData.append("coverPhoto", fileField.files[0])
        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/pages/updatePropertyCoverPic?assetid=${Property}`, {
            method: "PUT",
            headers: {
                "authtoken": authtoken
            },
            body: formData
        })
        try {
            const json = await response.json()
            if (json.success) {
                router.push("/admin/AllProperties")
            }
        } catch (error) {

        }
    }

    const handleOnchange = (e) => {
        setUpdatePropertyDetails({ ...updatePropertyDetails, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        dispatch(getAllProperties())
    }, [])

    return (
        <Sidebar>
            <Header />
            <div className='mt-28'>
                {currentProperty.map((x) => {
                    return <div key={x._id}>
                        <div className='text-sm my-5'>
                            <div className='flex items-center justify-center gap-3'>
                                <label htmlFor="coverPhoto">Cover Photo</label>
                                <input type="file" id='coverPhoto' name='coverPhoto' className='text-[12px]' />
                                <button className='bg-red-500 px-2 py-1 text-gray-100 font-semibold rounded-md' type='button' onClick={handleOnClickCoverPhoto} >Change</button>
                            </div>
                        </div>
                        <form className="font-[sans-serif] m-6 max-w-4xl mx-auto" onSubmit={handleOnSubmit} >
                            <div className="grid sm:grid-cols-2 gap-10">
                                <div className="relative flex items-center">
                                    <label className="text-[13px] bg-white text-gray-800 absolute px-2 top-[-10px] left-[18px] font-semibold">Title</label>
                                    <input onChange={handleOnchange} type="text" placeholder={x.title}
                                        className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none" name='title' />
                                </div>
                                <div className="relative flex items-center">
                                    <label className="text-[13px] bg-white text-gray-800 absolute px-2 top-[-10px] left-[18px] font-semibold">Type</label>
                                    <input onChange={handleOnchange} type="text" placeholder={x.propertyType}
                                        className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none" name='propertyType' />
                                </div>
                                <div className="relative flex items-center">
                                    <label className="text-[13px] bg-white text-gray-800 absolute px-2 top-[-10px] left-[18px] font-semibold">Price</label>
                                    <input onChange={handleOnchange} type="number" placeholder={x.price}
                                        className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none" name='price' />
                                </div>
                                <div className="relative flex items-center">
                                    <label className="text-[13px] bg-white text-gray-800 absolute px-2 top-[-10px] left-[18px] font-semibold">Rooms</label>
                                    <input onChange={handleOnchange} type="number" placeholder={x.rooms}
                                        className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none" name='rooms' />
                                </div>
                                <div className="relative flex items-center">
                                    <label className="text-[13px] bg-white text-gray-800 absolute px-2 top-[-10px] left-[18px] font-semibold">Bathrooms</label>
                                    <input onChange={handleOnchange} type="number" placeholder={x.baths}
                                        className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none" name='baths' />
                                </div>
                                <div className="relative flex items-center">
                                    <label className="text-[13px] bg-white text-gray-800 absolute px-2 top-[-10px] left-[18px] font-semibold">Area</label>
                                    <input onChange={handleOnchange} type="number" placeholder={x.sqft}
                                        className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none" name='sqft' />
                                </div>
                                <div className="relative flex items-center">
                                    <label className="text-[13px] bg-white text-gray-800 absolute px-2 top-[-10px] left-[18px] font-semibold">Video ID</label>
                                    <input onChange={handleOnchange} type="text" placeholder={x.coverVideo}
                                        className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none" name='coverVideo' />
                                </div>
                                <div className="relative flex items-center">
                                    <label className="text-[13px] bg-white text-gray-800 absolute px-2 top-[-10px] left-[18px] font-semibold">For Purpose</label>
                                    <select defaultValue={x.purpose} type="text"
                                        className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none" name='purpose'>
                                        <option value="">--Select Option--</option>
                                        <option value="For Rent">For Rent</option>
                                        <option value="For Sale">For Sale</option>
                                    </select>
                                </div>
                                <div className="relative flex items-center">
                                    <label className="text-[13px] bg-white text-gray-800 absolute px-2 top-[-10px] left-[18px] font-semibold">Status</label>
                                    <select onChange={handleOnchange} type="text"
                                        className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none" name='status' defaultValue={x.status} >
                                        <option value="">--Select Option--</option>
                                        <option value={propertyStatus.idle}>Idle</option>
                                        <option value={propertyStatus.onRent}>On Rent</option>
                                        <option value={propertyStatus.sold}>Sold</option>
                                    </select>
                                </div>
                                <div className="relative flex items-center sm:col-span-2">
                                    <label className="text-[13px] bg-white text-gray-800 absolute px-2 top-[-10px] left-[18px] font-semibold">Description</label>

                                    <textarea onChange={handleOnchange} name="description" id="" cols="30" rows="3" className='px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none' placeholder={x.description} ></textarea >
                                </div>
                                <div className="relative flex items-center sm:col-span-2">
                                    <label
                                        className="text-[13px] bg-white text-gray-800 absolute px-2 top-[-10px] left-[18px] font-semibold">Address</label>
                                    <textarea onChange={handleOnchange} name="address" id="" cols="30" rows="3" className='px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none' placeholder={x.address} ></textarea >
                                </div>
                                <div className="relative flex items-center justify-between px-10 text-[13px] font-semibold text-gray-800 w-full">
                                    <div>
                                        <h1 className='text-[15px] text-blue-700'>Condition</h1>
                                    </div>
                                    <div className='flex flex-col items-end'>
                                        <div className='flex items-center gap-2'>
                                            <label htmlFor="condition">Furnished</label>
                                            <input onChange={handleOnchange} type="radio" name='condition' defaultValue={conditionOfProperty.furnished} />
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <label htmlFor="condition">Semi-furnished</label>
                                            <input onChange={handleOnchange} type="radio" name='condition' defaultValue={conditionOfProperty.semi_furnished} />
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <label htmlFor="condition">Un-furnished</label>
                                            <input onChange={handleOnchange} type="radio" name='condition' defaultValue={conditionOfProperty.un_furnished} />
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
                                            <input onChange={handleOnchange} defaultValue={airConditionStatus.centrally} type="radio" name='airCondition' />
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <label htmlFor="condition">Own Controlled</label>
                                            <input onChange={handleOnchange} defaultValue={airConditionStatus.own} type="radio" name='airCondition' />
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
                                            <input onChange={handleOnchange} type="radio" name='balcony_or_terrace' defaultValue={"Balcony"} />
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <label htmlFor="balcony_or_terrace">Terrace</label>
                                            <input onChange={handleOnchange} type="radio" name='balcony_or_terrace' defaultValue={"Terrace"} />
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
                                            <input onChange={handleOnchange} type="checkbox" name='gym_or_health_club' defaultValue={"Gym or Health"} />
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
                                            <input onChange={handleOnchange} type="checkbox" name='swimmingPool' defaultValue={"Swimming Pool"} />
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
                                            <input onChange={handleOnchange} type="checkbox" name='jacuzzi' defaultValue={"Jacuzzi"} />
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
                                            <input onChange={handleOnchange} type="checkbox" name='sauna' defaultValue={"Sauna"} />
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
                                            <input onChange={handleOnchange} type="checkbox" name='steam_Room' defaultValue={"Steam Room"} />
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
                                            <input onChange={handleOnchange} type="checkbox" name='maintenance_staff' defaultValue={"Maintenance Staff"} />
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
                                            <input onChange={handleOnchange} type="checkbox" name='securityStaff' defaultValue={"Security Staff"} />
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
                                            <input onChange={handleOnchange} type="text" placeholder="Fullname"
                                                className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none" name='fullname' />
                                        </div>
                                        <div className="relative flex items-center">
                                            <label className="text-[13px] bg-white text-gray-800 absolute px-2 top-[-10px] left-[18px] font-semibold">Email</label>
                                            <input onChange={handleOnchange} type="email" placeholder="Email"
                                                className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none" name='email' />
                                        </div>
                                        <div className="relative flex items-center">
                                            <label className="text-[13px] bg-white text-gray-800 absolute px-2 top-[-10px] left-[18px] font-semibold">Contact</label>
                                            <input onChange={handleOnchange} type="number" name="mobile" placeholder="Contact"
                                                className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none" />
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <button type="submit"
                                className="mt-8 px-6 py-2.5 w-full text-sm font-semibold bg-blue-500 text-white rounded hover:bg-blue-600">Submit</button>
                        </form></div>


                })}
            </div>
        </Sidebar >
    )
}

export default page