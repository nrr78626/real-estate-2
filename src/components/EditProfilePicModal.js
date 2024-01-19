import React, { useState } from 'react'
import { updateMyAvatar } from '@/store/Slices/AddUser/addUserSlice'
import { useDispatch } from 'react-redux'

const EditProfilePicModal = ({ showModal, setShowModal }) => {
    const dispatch = useDispatch()
    const [myProfilePic, setMyProfilePic] = useState({ userPic: "" })

    if (!showModal) {
        return null
    }

    const handleOnCloseModal = (e) => {
        if (e.target.id === "myModal") {
            setShowModal(!showModal)
        }
    }

    const handleOnClick = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        const fileField = document.querySelector('input[type="file"]')
        formData.append("userPic", fileField.files[0])
        dispatch(updateMyAvatar(formData))
        setShowModal(!showModal)
    }

    const handleOnChange = (e) => {
        setMyProfilePic({ ...myProfilePic, [e.target.name]: e.target.value })
    }
    return (
        <div id='myModal' onClick={handleOnCloseModal} className='fixed inset-0 z-50 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center shadow shadow-black transition-all duration-500'>
            <div className='bg-white py-10 px-10 rounded flex flex-col'>
                <span className='text-lg font-bold mb-8 text-center'>Update Avatar</span>
                <div className='flex flex-col items-start px-5'>
                    <label htmlFor="userPic" className='text-sm font-bold text-gray-600 mx-1 my-1'>User Avatar</label>
                    <input type="file" name='userPic' className='outline-none bg-gray-300 px-2 py-1 border-b-2 border-gray-500 my-1 w-48 h-9 rounded text-[12px]' onChange={handleOnChange} required />
                </div>
                <div className='flex items-center justify-center mt-5 pt-5 text-sm'>
                    <button className='mx-5 py-2 px-4 bg-blue-500 hover:bg-blue-700 rounded text-white' onClick={handleOnClick}>Update</button>
                    <button className='mx-5 py-2 px-4 bg-blue-500 hover:bg-blue-700 rounded text-white' onClick={() => setShowModal(!showModal)} >Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default EditProfilePicModal