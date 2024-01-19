"use client"
import { Box,Fade,Text } from '@chakra-ui/react'
import React from 'react'
import HeroForm from '../HeroForm'
 
const HeroBanner = () => {
  return (
    <Fade in>
      <Box position={"relative"} minHeight={{base:"110vh", sm:"60vh"}} backgroundImage={`url('./Hero/bg.jpg')`} backgroundPosition={"center"} backgroundSize={"cover"} backgroundAttachment={"fixed"}>
      <Box position={"absolute"} width={"100%"} height={"100%"} opacity={"0.5"} backgroundColor={"blue.900"}/>
      <Box display={"flex"} flexDirection={{base:"column" ,sm:"row"}} alignItems={"center"} justifyContent={{base:"flex-start", sm:"space-between"}} maxWidth={"1280px"} position={"absolute"} color={"white"} fontWeight={"light"} left={"0"} right={"0"} top={"0"} bottom={"0"} margin={"0 auto"} padding={"2rem"}>
        <Box width={{base:"100%", sm:"50%"}}>
          <Text fontSize={{base:"2xl", sm:"3xl"}} lineHeight={"shorter"} marginBottom={"1.5rem"}>
            Download our new <strong>Property Buying Guide</strong> today...
          </Text>
        </Box>
        <Box width={{base:"100%", sm:"auto"}}><HeroForm/></Box>
      </Box>
    </Box>
    </Fade>
  )
}

export default HeroBanner