import React from 'react'
import { Box, Badge, Text, HStack, Flex } from '@chakra-ui/react'
import { TbBed, TbBath, TbRuler } from "react-icons/tb"
import Link from 'next/link'

const PropertyCard = (property) => {
    // const { address, coverPhoto, propertyType, price, title, rooms, baths, purpose, sqft, externalID } = usePropertyFormat(property)
    return (
        <Box marginBottom={"2rem"} backgroundColor={"#fff"} key={property._id}>
            <Link href={`/Properties/${property._id}`}>
                <Box backgroundImage={`url("/coverpic/${property.coverPhoto}")`} height={"250px"} backgroundPosition={"center center"} backgroundSize={"cover"} position={"relative"} display={"flex"} flexDirection={"column"} justifyContent={"space-between"}>
                    <Box margin={"1rem"}>
                        <Badge colorScheme='green'>{property.purpose}</Badge>
                    </Box>
                    <Box height={"50%"} bgGradient={"linear(to-t,#0a0b1cd9,#ffffff00 100%)"} display={"flex"} alignItems={"flex-end"} >
                        <Text fontSize={"xl"} fontWeight={"medium"} color={"whiteAlpha.900"}>₹</Text>
                        <Text fontSize={"xl"} fontWeight={"medium"} color={"whiteAlpha.900"}>{property.price}</Text>
                    </Box>
                </Box>
                <Box padding={"1rem"}>
                    <Text fontSize={"medium"} fontWeight={"medium"} marginBottom={"1rem"}>{property.propertyType}</Text>
                    <Text fontWeight={"light"} fontSize={"sm"} isTruncated>{property.address}</Text>
                    <Text isTruncated fontSize={"medium"} >{property.title}</Text>
                    <HStack spacing={"1.3rem"} marginTop={"1rem"}>
                        <Flex alignItems={"center"} fontSize={"sm"} gap={"0.3rem"}>
                            <TbBed fontSize="18px" />
                            {property.rooms}
                        </Flex>
                        <Flex alignItems={"center"} fontSize={"sm"} gap={"0.3rem"}>
                            <TbBath fontSize="18px" />
                            {property.baths}
                        </Flex>
                        <Flex alignItems={"center"} fontSize={"sm"} gap={"0.3rem"}>
                            <TbRuler fontSize="18px" />
                            {property.sqft}
                        </Flex>
                    </HStack>
                </Box>
            </Link>
        </Box>
    )
}

export default PropertyCard