import React from 'react'
import { Box, Button, Flex, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { navigationLinks } from '../../NavigationConts'
import { HiHomeModern } from 'react-icons/hi2'

const NavigationDesktop = () => {
  return (
    <Box color="blue.500" paddingY="2rem" backgroundColor={'white'} display={{ base: "none", md: "block" }}>
      <Box maxWidth={"1280px"} margin={"0 auto"}>
        <Flex alignItems={"center"} justifyContent={"space-between"} >
          <Link href={"/"}>
            <Box display={"flex"} gap={"2"} alignItems={"center"} cursor={"pointer"}>
              <HiHomeModern fontSize={"30"} />
              <Text fontSize={"2xl"} fontWeight={"black"}>
                Triviska Property
              </Text>
            </Box>
          </Link>
          <Flex gap={"12"} alignItems={"center"} fontWeight={"medium"}>
            {navigationLinks.map((item) => (
              <NavigationLinks key={item.title} {...item} />
            ))}
            <Button padding={"1rem"} colorScheme='twitter' fontSize={"0.8rem"} fontWeight={"medium"}>Create Listing</Button>
          </Flex>
        </Flex>
      </Box>
    </Box>
  )
}

export default NavigationDesktop

const NavigationLinks = ({ title, link, icon }) => {
  return (
    <Link href={link}>
      <Flex alignItems={"center"} gap={"0.5rem"}>
        {icon}
        {title}
      </Flex>
    </Link>
  )
}