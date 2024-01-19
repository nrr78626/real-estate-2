import { parseCookies } from 'nookies'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const EditPropertyModal = ({ openEditPropertyPhotoModal, setOpenEditPropertyPhotoModal, params }) => {
    const router = useRouter()

    const [changePropertyPhotos, setChangePropertyPhotos] = useState({ photos: null })

    if (!openEditPropertyPhotoModal) {
        return null
    }

    const closeModal = (e) => {
        if (e.target.id === "myModal") {
            setOpenEditPropertyPhotoModal(!openEditPropertyPhotoModal)
        }
    }

    const handleOnClick = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        const photos = document.querySelector('input[type="file"][multiple]')

        for (const [i, photo] of Array.from(photos.files).entries()) {
            formData.append(`photos`, photo)
        }
        const { authtoken } = parseCookies()
        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/pages/updatePropertyPic?assetid=${params}`, {
            method: "PUT",
            headers: {
                "authtoken": authtoken
            },
            body: formData
        })

        const json = await response.json()
        if (json.success) {
            router.push("/admin/AllProperties")
            setOpenEditPropertyPhotoModal(!openEditPropertyPhotoModal)
        }
    }

    const handleOnChange = (e) => {
        setChangePropertyPhotos({ ...changePropertyPhotos, [e.target.name]: e.target.value })
    }
    return (
        <div id='myModal' onClick={closeModal} className='fixed inset-0 z-50 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center shadow shadow-black transition-all duration-500'>
            <div className='bg-white py-10 px-10 rounded flex flex-col'>
                <span className='text-lg font-bold mb-8 text-center'>Update</span>
                <form onSubmit={handleOnClick} encType='multipart/form-data'>
                    <div className='flex flex-col items-start px-5'>
                        <label htmlFor="photos" className='text-sm font-bold text-gray-600 mx-1 my-1'>Property Pictures</label>
                        <input onChange={handleOnChange} type="file" name='photos' className='outline-none bg-gray-300 px-2 py-1 border-b-2 border-gray-500 my-1 w-48 h-9 rounded text-[12px]' required multiple />
                    </div>
                    <div className='flex items-center justify-center mt-5 pt-5 text-sm'>
                        <button type='submit' className='mx-5 py-2 px-4 bg-blue-500 hover:bg-blue-700 rounded text-white text-sm'>Update</button>
                        <button className='mx-5 py-2 px-4 bg-blue-500 hover:bg-blue-700 rounded text-white text-sm' onClick={() => setOpenEditPropertyPhotoModal(!openEditPropertyPhotoModal)} >Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditPropertyModal