import React from 'react'
import { Box, Flex, IconButton, Menu, MenuButton, MenuList, Text, MenuItem } from '@chakra-ui/react'
import Link from 'next/link'
import { navigationLinks } from '../../NavigationConts'
import { HiHomeModern } from 'react-icons/hi2'
import { GiHamburgerMenu } from "react-icons/gi"

const NavigationMobile = () => {
  return (
    <Box color="blue.500" padding="2rem" backgroundColor={'white'} display={{ base: "block", md: "none" }}>

      <Flex alignItems={"center"} justifyContent={"space-between"} >
        <Link href={"/"}>
          <Box display={"flex"} gap={"2"} alignItems={"center"} cursor={"pointer"}>
            <HiHomeModern fontSize={"30"} />
            <Text fontSize={"14px"} fontWeight={"black"}>
              Triviska Property
            </Text>
          </Box>
        </Link>
        <Menu>
          <MenuButton as={IconButton} aria-label='Options' icon={<GiHamburgerMenu />} variant={"outline"} />
          <MenuList>
            {navigationLinks.map((item) => (
              <NavigationLinks key={item.title} {...item} />
            ))}
          </MenuList>
        </Menu>
        {/* <Button padding={"1rem"} colorScheme='twitter' fontSize={"0.8rem"} fontWeight={"medium"}>Create Listing</Button> */}
      </Flex>

    </Box>
  )
}

export default NavigationMobile

const NavigationLinks = ({ title, link, icon }) => {
  return (
    <Link href={link}>
      <MenuItem alignItems={"center"} gap={"0.5rem"}>
        {icon}
        {title}
      </MenuItem>
    </Link>
  )
}