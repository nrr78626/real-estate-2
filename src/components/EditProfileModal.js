import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateProfile } from '@/store/Slices/AddUser/addUserSlice'

const EditProfileModal = ({ isOpen, onClose, myId }) => {
    const dispatch = useDispatch()
    const [updaetMyProfile, setUpdateMyProfile] = useState({ fullname: "", contact: "", password: "", cpassword: "" })

    const handleOnClick = async (e) => {
        e.preventDefault()
        const { fullname, contact, password } = updaetMyProfile
        dispatch(updateProfile({ fullname, contact, password, myId }))
        setUpdateMyProfile({ fullname: "", password: "", contact: "", cpassword: "" })
    }

    const handleOnChange = (e) => {
        setUpdateMyProfile({ ...updaetMyProfile, [e.target.name]: e.target.value })
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} >
            <ModalOverlay />
            <ModalContent>
                <form onSubmit={handleOnClick}>
                    <ModalHeader>
                        <ModalCloseButton size={"sm"} />
                        <div className='flex flex-col items-center text-sm text-blue-700'>
                            <h1 className='text-center'>Update Profile</h1>
                        </div>
                    </ModalHeader>
                    <ModalBody>
                        <div className='text-sm'>
                            <div className='flex items-center justify-between my-7'>
                                <label htmlFor="fullname">Fullname</label>
                                <input value={updaetMyProfile.fullname} type="text" id='fullname' name='fullname' placeholder='Fullname' className='outline-none border-b-[1px] border-blue-600 px-1' onChange={handleOnChange} />
                            </div>
                            <div className='flex items-center justify-between my-7'>
                                <label htmlFor="contact">Contact</label>
                                <input value={updaetMyProfile.contact} type="text" id='contact' name='contact' placeholder='Contact' className='outline-none border-b-[1px] border-blue-600 px-1' onChange={handleOnChange} />
                            </div>
                            <div className='flex items-center justify-between my-7'>
                                <label htmlFor="password">Password</label>
                                <input value={updaetMyProfile.password} type="password" id='password' name='password' placeholder='Password' className='outline-none border-b-[1px] border-blue-600 px-1' onChange={handleOnChange} />
                            </div>
                            <div className='flex items-center justify-between my-7'>
                                <label htmlFor="cpassword">Confirm Password</label>
                                <input value={updaetMyProfile.cpassword} type="password" id='cpassword' name='cpassword' placeholder='Confirm Password' className='outline-none border-b-[1px] border-blue-600 px-1' onChange={handleOnChange} />
                            </div>
                            <div className='flex items-center justify-center text-center'>
                                <span className={`text-sm font-bold text-red-600 ${updaetMyProfile.password != updaetMyProfile.cpassword ? "opacity-100" : "opacity-0"}`}>Password not matched</span>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <div className='flex items-center justify-center text-center text-sm font-bold gap-6'>
                            <button type='submit' className='bg-green-600 text-gray-100 py-2 px-4 rounded' onClick={onClose} >Submit</button>
                        </div>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    )
}

export default EditProfileModal