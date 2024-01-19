"use client"
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from "next/navigation"
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import PropertyThumbnailSlider from '@/Features/Property/components/PropertyThumbnailSlider'
import PropertStats from '@/Features/Property/components/PropertStats'
import PropertyYoutubeEmbed from '@/Features/Property/components/PropertyYoutubeEmbed'
// import PropertyMatterPortEmbed from '@/Features/Property/components/PropertyMatterPortEmbed'
import { Box, Grid, GridItem, Text, Badge, Flex, SimpleGrid } from "@chakra-ui/react"
import { TbMapPin } from "react-icons/tb"
import TextContentBox from '@/Features/common/module/TextContentBox'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProperties } from '@/store/Slices/Properties/propertiesSlices'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import EditPropertyModal from '@/components/EditPropertyPhotosModal'
import Link from 'next/link'
import { deleteProperty } from '@/store/Slices/Properties/propertiesSlices'


const page = () => {
    const params = useParams()
    const router = useRouter()
    const dispatch = useDispatch()
    const { Property } = params

    const { properties } = useSelector(state => state.properties)
    const [openEditPropertyPhotoModal, setOpenEditPropertyPhotoModal] = useState(false)

    const newProperty = properties.filter((e) => {
        return e._id == Property
    })

    useEffect(() => {
        dispatch(getAllProperties())
    }, [])

    return (
        <Sidebar>
            <Header />
            {newProperty.map((x) => {
                return <Box backgroundColor={"#f7f8f9"} paddingY={"3rem"} key={x._id}>
                    <section className='text-gray-600 body-font overflow-hidden'>
                        <div className='container px-5 py-24 mx-auto'>
                            <Grid templateColumns={"repeat(6, 1fr)"} gap={"5"} maxWidth={"1280px"} margin={"0 auto"}>
                                <GridItem colSpan={"6"}>
                                    <Badge colorScheme='green'>{x.purpose}</Badge>
                                    <Text fontSize={"3xl"} fontWeight={"medium"} color={"blue.800"} textAlign={{ base: "center", sm: "left" }}>
                                        {x.propertyType} {x.title}
                                    </Text>
                                    <Flex fontSize={"xl"} color={"blue.600"} textAlign={"center"} alignItems={"center"} flexDirection={{ base: "column", sm: "row" }} gap={"0.5rem"} marginY={{ base: "1rem", sm: "0" }}>
                                        <TbMapPin />
                                        <Text fontWeight={"light"}>{x.address} - ID: {x._id}</Text>
                                    </Flex>
                                </GridItem>
                                <GridItem position={"relative"} colSpan={{ base: 6, sm: 3 }}>
                                    <EditIcon className='absolute cursor-pointer z-40 top-1 left-1' color={"black"} onClick={() => { setOpenEditPropertyPhotoModal(!openEditPropertyPhotoModal) }} />
                                    <EditPropertyModal openEditPropertyPhotoModal={openEditPropertyPhotoModal} setOpenEditPropertyPhotoModal={setOpenEditPropertyPhotoModal} params={Property} />
                                    <PropertyThumbnailSlider photos={x?.photos} />
                                </GridItem>
                                <GridItem>
                                    <Link href={`/admin/AddProperty/${x._id}`} className='mx-3 my-2' >
                                        <EditIcon fontSize={"xl"} color={"green.600"} />
                                    </Link>
                                    <DeleteIcon fontSize={"xl"} color={"red.600"} cursor={"pointer"} onClick={() => { dispatch(deleteProperty({ id: x._id })), router.push("/admin/AllProperties") }} className='mx-3 my-2'/>
                                    <PropertStats rooms={x.rooms} baths={x.baths} price={x.price} sqft={x.sqft} />
                                    <TextContentBox title="Description">
                                        <Text fontWeight={"light"} color={"gray.600"} fontSize={"1rem"} noOfLines={"4"}>
                                            {x.description}
                                        </Text>
                                    </TextContentBox>
                                    <TextContentBox title="Amenities">
                                        <SimpleGrid columns={{ base: 1, sm: 2 }} fontWeight={"bold"} color={"blue.700"} fontSize={"14px"}>
                                            {newProperty[0].amenities.map((i) => {
                                                return <div key={i._id}>
                                                    {i.condition && <p>{i.condition}</p>}
                                                    {i.airConditionb && <p>{i.airCondition}</p>}
                                                    {i.balcony_or_terrace && <p>{i.balcony_or_terrace}</p>}
                                                    {i.gym_or_health_club && <p>{i.gym_or_health_club}</p>}
                                                    {i.swimmingPool && <p>{i.swimmingPool}</p>}
                                                    {i.jacuzzi && <p>{i.jacuzzi}</p>}
                                                    {i.sauna && <p>{i.sauna}</p>}
                                                    {i.steam_Room && <p>{i.steam_Room}</p>}
                                                    {i.maintenance_staff && <p>{i.maintenance_staff}</p>}
                                                    {i.securityStaff && <p>{i.securityStaff}</p>}
                                                </div>
                                            })}
                                            <p>Please contact us for more information</p>
                                        </SimpleGrid>
                                    </TextContentBox>
                                </GridItem>
                                <GridItem colSpan={{ base: 6, sm: 3 }}>
                                    <PropertyYoutubeEmbed coverVideo={x.coverVideo} />
                                </GridItem>
                                {/* <GridItem colSpan={{ base: 6, sm: 3 }}>
                                    <PropertyMatterPortEmbed panorama={x.panorama} />
                                </GridItem> */}
                            </Grid>
                        </div>
                    </section>
                </Box>
            })}
        </Sidebar>
    )
}

export default page