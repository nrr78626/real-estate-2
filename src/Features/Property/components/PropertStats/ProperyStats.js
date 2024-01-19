import { Box, Center, Divider, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { TbBath, TbBed, TbRuler } from 'react-icons/tb'

const ProperyStats = ({ rooms, baths, price, sqft }) => {
    return (
        <Box backgroundColor={"gray.300"} padding={"1.5rem"} marginBottom={"1rem"}>
            <Flex flexDirection={{ base: "column", sm: "row" }} fontSize={"xl"} color={"gray.600"} fontWeight={"light"} gap={"1rem"} justifyContent={"space-around"} alignItems={"center"}>
                <Flex flexDirection={'column'} justifyContent={"center"} alignItems={"center"} gap={"0.3rem"}>
                    <Text>Beds</Text>
                    <Flex alignItems={"center"} gap={"0.5rem"}>
                        <TbBed />
                        {rooms}
                    </Flex>
                </Flex>
                <Center height={"50px"}>
                    <Divider orientation='vertical' />
                </Center>
                <Flex flexDirection={'column'} justifyContent={"center"} alignItems={"center"} gap={"0.3rem"}>
                    <Text>Baths</Text>
                    <Flex alignItems={"center"} gap={"0.5rem"}>
                        <TbBath />
                        {baths}
                    </Flex>
                </Flex>
                <Center height={"50px"}>
                    <Divider orientation='vertical' />
                </Center>
                <Flex flexDirection={'column'} justifyContent={"center"} alignItems={"center"} gap={"0.3rem"}>
                    <Text>Area</Text>
                    <Flex alignItems={"center"} gap={"0.5rem"}>
                        <TbRuler />
                        {sqft}
                        <sup>2f</sup>
                    </Flex>
                </Flex>
                <Center height={"50px"}>
                    <Divider orientation='vertical' />
                </Center>
                <Flex flexDirection={'column'} justifyContent={"center"} alignItems={"center"} gap={"0.3rem"}>
                    <Text>Price</Text>
                    <Flex alignItems={"center"} gap={"0.5rem"}>
                        {price}
                    </Flex>
                </Flex>
            </Flex>
        </Box>
    )
}

export default ProperyStats