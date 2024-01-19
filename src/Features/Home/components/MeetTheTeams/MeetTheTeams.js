import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { agents } from './agentsConsts'
import AgentsCard from './components/AgentsCard'

const MeetTheTeams = () => {
    return (
        <Box maxWidth={"1280px"} margin={"0 auto"} paddingY={{ base: "3rem", sm: "6rem" }}>
            <Text fontSize={{ base: "2xl", sm: "3xl" }} lineHeight={"shorter"} fontWeight={"light"} paddingX={"2rem"} textAlign={"center"}>
                Meet The Team
            </Text>
            <Text fontSize={"xl"} fontWeight={"light"} marginTop={"1rem"} marginBottom={"3rem"} paddingX={"2rem"} textAlign={"center"}>The best in the industry, at your service 24/7</Text>
            <Flex direction={{ base: "column", sm: "row" }} justifyContent={"space-between"} gap={"1.5rem"}>
                {agents.map((agent) => (
                    <AgentsCard key={agent.name} {...agent} />
                ))}
            </Flex>
        </Box>
    )
}

export default MeetTheTeams