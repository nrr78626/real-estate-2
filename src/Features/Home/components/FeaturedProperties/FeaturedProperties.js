import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import PropertySlider from './components/PropertySlider'

const FeaturedProperties = ({ featuredProps }) => {
  return (
    <Box backgroundColor={"blue.50"}>
      <Box maxWidth={"1280px"} margin={"0 auto"} color={"gray.600"} paddingY={{ base: "3rem", sm: "6rem" }}>
        <Text fontSize={{ base: "2xl", sm: "lg" }} lineHeight={"shorter"} fontWeight={"light"} paddingX={"2rem"} textAlign={"center"}>Descover our properties</Text>
        <Text fontSize={"xl"} fontWeight={"light"} marginTop={"1rem"} marginBottom={"3rem"} paddingX={"2rem"} textAlign={"center"}>A selection of our best properties</Text>
        <PropertySlider featuredProps={featuredProps} />
      </Box>
    </Box>
  )
}

export default FeaturedProperties