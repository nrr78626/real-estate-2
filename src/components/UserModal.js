import React, { useEffect, useState } from 'react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react"
import { roles } from '@/models/contstance/userConstaants'
import { useDispatch, useSelector } from 'react-redux'
import { showUsers } from '@/store/Slices/AddUser/addUserSlice'
import { useSearchParams, useRouter } from "next/navigation"
import { updateUsersRole } from '@/store/Slices/AddUser/addUserSlice'

const UserModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { addedUser, loading, success } = useSelector((state) => state?.addUser)

  const [currUpdateUserRole, setCurrUpdateUserRole] = useState("")

  const [singleRole, setSingleRole] = useState({ role: "" })

  const currentUserId = useSearchParams().get("current_user_id")

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    const { role } = singleRole
    dispatch(updateUsersRole({ role, currUpdateUserRole }))
  }

  const handleOnChange = (e) => {
    setSingleRole({ ...singleRole, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    dispatch(showUsers())
    if (currentUserId) {
      const currentUser = addedUser?.users?.filter((e) => e._id == currentUserId)
      setCurrUpdateUserRole(currentUser[0]?._id)
    }
  }, [currentUserId])

  useEffect(() => {
    router.push("/admin/Users")
  }, [success])

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleOnSubmit}>
            <ModalHeader>
              <ModalCloseButton size={'sm'} />
              <div className='flex flex-col items-center text-sm text-blue-700'>
                <h1 className='text-center'>Update Role</h1>
              </div>
            </ModalHeader>
            <ModalBody>

              <div className='flex text-sm items-center justify-center flex-col'>
                <span className='font-bold my-4'>Change Role</span>
                <select name="role" id="role" defaultValue={currUpdateUserRole && currUpdateUserRole[0]?.role} className='mb-4 outline-none' onChange={handleOnChange}>
                  <option value={roles?.moderator}>Modarator</option>
                  <option value={roles?.admin}>Admin</option>
                  <option value={roles?.user}>User</option>
                </select>
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
    </>
  )
}

export default UserModal