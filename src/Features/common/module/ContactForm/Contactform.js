"use client"
import { Box, FormControl, Input, Textarea } from '@chakra-ui/react'
import React from 'react'
import { useForm } from "react-hook-form"

const Contactform = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()

    const handleOnSubmit = (data) => {
        console.log(data)
    }
    return (
        <Box width={"100%"} borderRadius={"sm"} backgroundColor={"white"} color={"gray.700"}>
            <form className='mx-4'>
                <FormControl>
                    <Input paddingX={"1rem"} marginTop={"1.3rem"} id='name' type='text' placeholder='Name' />
                    <Input paddingX={"1rem"} marginTop={"1.3rem"} id='email' type='email' placeholder='Email' />
                    <Input paddingX={"1rem"} marginTop={"1.3rem"} id='phone' type='text' placeholder='Phone' />
                    <Textarea marginTop={"1.3rem"} id='message' placeholder='Message' ></Textarea>
                </FormControl>
            </form>
        </Box>
    )
}

export default Contactform