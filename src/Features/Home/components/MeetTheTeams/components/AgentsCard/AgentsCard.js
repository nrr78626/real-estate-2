import { Box, Image, Text } from '@chakra-ui/react'
import React from 'react'

const AgentsCard = ({ name, image, description, title }) => {
    return (
        <Box backgroundColor={"#c5c7c5"} padding={"2rem"} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} marginBottom={{ base: "1rem", sm: "0" }} shadow={"md"} textAlign={"center"}>
            <Image src={image} width={"10rem"} height={"10rem"} objectFit={"cover"} borderRadius={"full"} marginBottom={"2rem"} />
            <Text color={"blue.400"} fontSize={"lg"} fontWeight={"bold"}>{name}</Text>
            <Text fontSize={"medium"} color={"blue.600"} >{title}</Text>
            <Text fontSize={"sm"} fontWeight={"light"} noOfLines={"4"} marginTop={"1rem"}>{description}</Text>
        </Box>
    )
}

export default AgentsCard