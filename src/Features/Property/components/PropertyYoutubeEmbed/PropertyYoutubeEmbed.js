import { Box } from '@chakra-ui/react'
import React from 'react'

const PropertyYoutubeEmbed = ({ coverVideo }) => {
    const ratio = (315 / 560) * 100;
    return (
        <Box paddingTop={`${ratio}%`} position={"relative"} height={"0"} overflow={"hidden"} frameBorder={"0"}>
            <iframe style={{ position: "absolute", top: 0, bottom: 0 }} width={"100%"} height={"100%"} src={`https://www.youtube.com/embed/${coverVideo}`} allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' />
            {/* <iframe width="930" height="523" src="https://www.youtube.com/embed/Mn6HAAnU9q4" title="An Award Winning Property | Cinematic Luxury Real Estate Video | ProReal Media" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}
        </Box>
    )
}

export default PropertyYoutubeEmbed