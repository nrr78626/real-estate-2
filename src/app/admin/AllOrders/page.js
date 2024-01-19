"use client"
import React, { useEffect } from 'react'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import Image from 'next/image'
import { Badge, Box, Text, HStack, Flex } from "@chakra-ui/react"
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { allQuery } from '@/store/Slices/AddQuery/addQuerySlice'


const page = () => {
  const dispatch = useDispatch()
  const { query } = useSelector((state) => state.Query)

  useEffect(() => {
    dispatch(allQuery())
  }, [])

  return (
    <Sidebar>
      <Header />
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {query.map((x) => {
              return <div className="lg:w-1/4 md:w-1/2 p-4 w-full cursor-pointer" key={x._id} >
                <Link href={`/admin/AllOrders/UpdateOrders/${x._id}`} legacyBehavior>
                  <div className=''>
                    <a className="block relative h-48 rounded overflow-hidden">
                      {/* <Badge variant='solid' colorScheme='green' className='absolute top-1 left-1' >{x.purpose}</Badge> */}
                      <Box height={"30%"} bgGradient={"linear(to-t,#0a0b1cd9,#ffffff00 100%)"} display={"flex"} alignItems={"flex-end"} className='absolute w-full bottom-0' >
                        <Text fontSize={"medium"} fontWeight={"medium"} color={"whiteAlpha.900"} className='flex items-center' > {x.price}</Text>
                      </Box>
                      <Image alt="ecommerce" className="object-cover object-center w-full h-full block" src={`/coverpic/${x.assetPic}`} width={1000} height={1000} priority={true} />
                    </a>
                    <div className="mt-1 p-1 text-sm bg-blue-50">
                      <Text fontWeight={"medium"}>{x.fullname}</Text>
                      <Text fontWeight={"light"} fontSize={"xs"} isTruncated>{x.email}</Text>
                      <Text isTruncated >{x.contact}</Text>
                      <HStack spacing={"1.3rem"}>
                        <Flex alignItems={"center"} fontSize={'12px'} fontWeight={"bold"} gap={"0.3rem"} color={x.status == "Pending" ? "red.600":"green.600"} >
                          {x.status}
                        </Flex>
                      </HStack>
                    </div>
                  </div>
                </Link>
              </div>
            })}
          </div>
        </div>
      </section>
    </Sidebar>
  )
}

export default page