"use client"
import DefaultLayout from '@/Features/Layouts/DefaultLayouts/DefaultLayout'
import PropertyCard from '@/Features/common/module/PropertyCard'
import { getAllProperties } from '@/store/Slices/Properties/propertiesSlices'
import { Box, SimpleGrid } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const page = () => {
    const dispatch = useDispatch()
    const { hits } = require("@/Features/data/Properties")
    const {properties} = useSelector((state)=> state.properties)
    useEffect(() => {
        dispatch(getAllProperties())
    },[])
    console.log(properties)
    return (
        <DefaultLayout>
            <Box backgroundColor={"#f7f8f9"} padding={"3rem"}>
                <Box maxWidth={"1080px"} margin={"0 auto"}>
                    <SimpleGrid columns={{ base: "1", sm: "3" }} gap={{ base: "0", sm: "2rem" }}>
                        {properties.map((property) => (
                            <PropertyCard key={property._id} {...property} />
                        ))}
                    </SimpleGrid>
                </Box>
            </Box>
        </DefaultLayout>
    )
}

export default page