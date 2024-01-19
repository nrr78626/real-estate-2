import DefaultLayout from '@/Features/Layouts/DefaultLayouts/DefaultLayout'
import { Box, Grid, GridItem, Text } from '@chakra-ui/react'
import React from 'react'
import TextContentBox from '@/Features/common/module/TextContentBox'
import ContactForm from '@/Features/common/module/ContactForm'

const page = () => {
  return (
    <DefaultLayout>
        <Box backgroundColor={"#f7f8f9"} paddingY={"3rem"}>
            <Grid templateColumns={"repeat(6, 1fr)"} gap={"5"} maxWidth={"1280px"} margin={"0 auto"}>
                <GridItem colSpan={{base:6,sm:4}}>
                    <TextContentBox title="Contact us">
                        <ContactForm/>
                    </TextContentBox>
                </GridItem>
                <GridItem colSpan={{base:6,sm:2}}>
                    <TextContentBox title="For Inquierys contact:">
                        <Text fontWeight={"light"} color={"gray.600"} fontSize={"1rem"} marginBottom={"1rem"}>
                            Linnet Cubin <br />
                            Public relation manager <br />
                            774 NE 84th St Miami, FL 33879
                        </Text>
                        <Text fontWeight={"light"} color={"gray.600"} fontSize={"1rem"} marginBottom={"1rem"}>
                            Linnet Cubin <br />
                            Public relation manager <br />
                            774 NE 84th St Miami, FL 33879
                        </Text>
                    </TextContentBox>
                </GridItem>
            </Grid>
        </Box>
    </DefaultLayout>
  )
}

export default page