"use client"
import DefaultLayout from '@/Features/Layouts/DefaultLayouts/DefaultLayout'
import PropertStats from '@/Features/Property/components/PropertStats'
import PropertyThumbnailSlider from '@/Features/Property/components/PropertyThumbnailSlider'
// import usePropertyFormat from '@/Features/common/Hooks/usePropertyFormat'
import { Badge, Box, Flex, Grid, GridItem, SimpleGrid, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { TbMapPin } from 'react-icons/tb'
import TextContentBox from '@/Features/common/module/TextContentBox'
import PropertyYoutubeEmbed from '@/Features/Property/components/PropertyYoutubeEmbed'
// import PropertyMatterPortEmbed from '@/Features/Property/components/PropertyMatterPortEmbed'
import { getAllProperties } from '@/store/Slices/Properties/propertiesSlices'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'next/navigation'
import Link from 'next/link'

const page = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const { properties } = useSelector((state) => state.properties)

  const { slug } = params
  // const property = require("@/Features/data/Property")
  const newProperty = properties.filter((e) => {
    return e._id == slug
  })
  useEffect(() => {
    dispatch(getAllProperties())
  }, [])

  console.log(newProperty)
  return (
    <DefaultLayout>
      {newProperty.map((x) => {
        return <Box backgroundColor={"#f7f8f9"} paddingY={"3rem"} key={x._id}>
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
            <GridItem colSpan={{ base: 6, sm: 3 }}>
              <PropertyThumbnailSlider photos={x.photos} />
            </GridItem>
            <GridItem>
              <PropertStats rooms={x.rooms} baths={x.baths} price={x.price} sqft={x.sqft} />
              <TextContentBox title="Description">
                <Text fontWeight={"light"} color={"gray.600"} fontSize={"1rem"} noOfLines={"4"}>
                  {x.description}
                </Text>
              </TextContentBox>
              <TextContentBox title="Amenities">
                <SimpleGrid columns={{ base: 1, sm: 2 }} fontWeight={"light"} color={"gray.600"} fontSize={"1rem"}>
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
              <div>
                <Link href={`/Query/${x._id}`} className=''>
                  <button className='bg-blue-600 text-gray-100 px-2 py-2 rounded-sm'>Contact</button>
                </Link>
              </div>
            </GridItem>
            <GridItem colSpan={{ base: 6, sm: 3 }}>
              <PropertyYoutubeEmbed coverVideo={x.coverVideo} />
            </GridItem>
            {/* <GridItem colSpan={{ base: 6, sm: 3 }}>
              <Link href={"#"} className='bg-blue-600 text-gray-100 text-sm font-semibold h-full' >
                <button type='button' className='py-5 px-2' >Get Contact</button>
              </Link>
            </GridItem> */}
          </Grid>
        </Box>
      })}

    </DefaultLayout>
  )
}

export default page