"use client"
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import React, { useEffect } from 'react'
import { getAllProperties } from '@/store/Slices/Properties/propertiesSlices'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Text, Badge, HStack, Flex, SimpleGrid } from '@chakra-ui/react'
import { TbBed, TbBath, TbRuler } from 'react-icons/tb'
import Link from 'next/link'
import { FaRupeeSign } from "react-icons/fa"
import { BsFillPlusCircleFill } from "react-icons/bs"
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const page = () => {
    const dispatch = useDispatch()
    const router = useRouter()

    const { properties, loading } = useSelector((state) => state.properties)

    useEffect(() => {
        dispatch(getAllProperties())
    }, [])

    useEffect(() => {
        if (loading) {
            router.refresh()
        }
    }, [])

    return (
        <Sidebar>
            <Header />
            <section className="text-gray-600 body-font relative">
                <div className='flex items-center justify-center top-14 left-5 absolute'>
                    <h1>
                        <Link href={"/admin/AddProperty"}>
                            <BsFillPlusCircleFill className='cursor-pointer font-bold text-blue-600 text-2xl' />
                        </Link>
                    </h1>
                </div>
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-wrap -m-4">
                        {properties.map((x) => {
                            return <div className="lg:w-1/4 md:w-1/2 p-4 w-full cursor-pointer" key={x._id} >
                                <Link href={`/admin/AllProperties/${x._id}`} legacyBehavior>
                                    <div className=''>
                                        <a className="block relative h-48 rounded overflow-hidden">
                                            <Badge variant='solid' colorScheme='green' className='absolute top-1 left-1' >{x.purpose}</Badge>
                                            <Box height={"30%"} bgGradient={"linear(to-t,#0a0b1cd9,#ffffff00 100%)"} display={"flex"} alignItems={"flex-end"} className='absolute w-full bottom-0' >
                                                <Text fontSize={"medium"} fontWeight={"medium"} color={"whiteAlpha.900"} className='flex items-center' ><FaRupeeSign /> {x.price}</Text>
                                            </Box>
                                            <Image alt="ecommerce" className="object-cover object-center w-full h-full block" src={`/coverpic/${x.coverPhoto}`} width={1000} height={1000} priority={true} />
                                        </a>
                                        <div className="mt-1 p-1 text-sm bg-blue-50">
                                            <Text fontWeight={"medium"}>{x.propertyType}</Text>
                                            <Text fontWeight={"light"} fontSize={"xs"} isTruncated>{x.address}</Text>
                                            <Text isTruncated >{x.title}</Text>
                                            <HStack spacing={"1.3rem"}>
                                                <Flex alignItems={"center"} fontSize={"sm"} gap={"0.3rem"}>
                                                    <TbBed fontSize="18px" />
                                                    {x.rooms}
                                                </Flex>
                                                <Flex alignItems={"center"} fontSize={"sm"} gap={"0.3rem"}>
                                                    <TbBath fontSize="18px" />
                                                    {x.baths}
                                                </Flex>
                                                <Flex alignItems={"center"} fontSize={"sm"} gap={"0.3rem"}>
                                                    <TbRuler fontSize="18px" />
                                                    {x.sqft}
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

        </Sidebar >
    )
}

export default page