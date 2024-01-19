import React from 'react'
import { useSearchParams } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { deleteUser } from '@/store/Slices/AddUser/addUserSlice'

const DeleteUserAlert = ({ showAlert, setShowAlert }) => {
    const params = useSearchParams()
    const dispatch = useDispatch()

    if (!showAlert) {
        return null
    }

    const closeDeleteModal = (e) => {
        if (e.target.id === "deleteModal") {
            setShowAlert(!showAlert)
        }
    }

    const handleOnDelete = async (e) => {
        e.preventDefault()
        const userId = await params.get("current_user_id")
        dispatch(deleteUser({userId}))
        setShowAlert(!showAlert)
    }

    return (
        <div id='deleteModal' onClick={closeDeleteModal} className='fixed text-sm inset-0 z-50 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center shadow shadow-black cursor-default' >
            <div className='bg-white py-10 px-10 rounded flex flex-col justify-center items-center'>
                <div className='my-3'>
                    <h1 className='text-gray-700 font-bold'>Do you wan't to delete this user ?</h1>
                </div>
                <div className='my-3'>
                    <button className='bg-green-500 text-gray-100 py-1 px-2 rounded-sm mx-2' onClick={handleOnDelete} >Yes</button>
                    <button className='bg-red-500 text-gray-100 py-1 px-2 rounded-sm mx-2' onClick={() => { setShowAlert(!showAlert) }} >No</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteUserAlert