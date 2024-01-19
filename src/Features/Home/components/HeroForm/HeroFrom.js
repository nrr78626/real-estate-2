import { Box, Flex, FormControl, Input, Text, Checkbox, Button } from '@chakra-ui/react'
import React from 'react'
import { useForm } from "react-hook-form"

const HeroFrom = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()

    const handleOnSubmit = async (data) => {

    }
    return (
        <>
            <Box width={"100%"} padding={"2rem"} borderRadius={"sm"} backgroundColor={"white"} color={"gray.700"}>
                <Text fontSize={"md"} fontWeight={"bold"}>Free PDF Guide</Text>
                {/* <Text >Complete the form below to download your guide</Text> */}
                <form onClick={handleOnSubmit}>
                    <FormControl>
                        <Input marginTop={"1.3rem"} id='name' type='text' placeholder='Name' {...register("name", { required: true })} />
                        {errors.name && (
                            <Text fontSize={"xs"} color={"red.400"}>
                                {errors.name.type}
                            </Text>
                        )}
                        <Flex gap={{ base: "0", sm: "1rem" }} flexDirection={{ base: "column", sm: "row" }}>
                            <Input marginTop={"1.3rem"} id='email' type='email' placeholder='Email' {...register("email", { required: true })} />
                            {errors.email && (
                                <Text fontSize={"xs"} color={"red.400"}>
                                    {errors.email.type}
                                </Text>
                            )}
                            <Input marginTop={"1.3rem"} id='phone' type='text' placeholder='Phone' {...register("phone", { required: true })} />
                            {errors.phone && (
                                <Text fontSize={"xs"} color={"red.400"}>
                                    {errors.phone.type}
                                </Text>
                            )}
                        </Flex>
                        <Checkbox marginTop={"1rem"} id='gdpr' type='checkbox' placeholder='GDPR'{...register("gdpr", { required: true })}>
                            I constent to having this website store to my submitted info
                        </Checkbox>
                        {errors.gdpr && (
                            <Text fontSize={"xs"} color={"red.400"}>
                                {errors.gdpr.type}
                            </Text>
                        )}
                    </FormControl>
                    <Button disabled={true} type='button' colorScheme='blue' width={"100%"} fontSize={"medium"} padding={"1rem"} marginTop={"2rem"}>Download Now</Button>
                </form>
            </Box>
        </>
    )
}

export default HeroFrom