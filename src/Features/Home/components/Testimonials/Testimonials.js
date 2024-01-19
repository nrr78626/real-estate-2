import { Box, SimpleGrid, Text } from '@chakra-ui/react'
import React from 'react'
import { testimonials } from './testimonialConsts'
import TestimonialCards from './components/TestimonialCards'

const Testimonials = () => {
  return (
    <Box backgroundColor={"blue.50"}>
        <Box maxWidth={"1280px"} margin={"0 auto"} paddingY={{base:"3rem", sm:"6rem"}}>
            <Text fontSize={{base:"2xl", sm:"lg"}} lineHeight={"shorter"} fontWeight={"light"} paddingX={"2rem"} textAlign={"center"}>Testimonials</Text>
            <Text fontSize={"md"} fontWeight={"light"} marginTop={"1rem"} marginBottom={"3rem"} paddingX={"2rem"} textAlign={"center"}>Here's what our valued clients have to say</Text>
            <SimpleGrid column={"3"} minChildWidth={"300px"} gap={{base:"0.5rem",sm:"2.5rem"}}>
                {testimonials.map((testimonial)=>(
                    <TestimonialCards key={testimonial.name} {...testimonial}/>
                ))}
            </SimpleGrid>
        </Box>
    </Box>
  )
}

export default Testimonials