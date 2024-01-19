"use client"
import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, FreeMode, Thumbs } from 'swiper/modules'
import { Divider } from "@chakra-ui/react"

import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/navigation"
import "swiper/css/thumbs"

const PropertyThumbnailSlider = ({ photos }) => {
    const [thumbsSwiper, setThumsSwiper] = useState(null)
    return (
        <>
            <Swiper style={{ "--swiper-navigation-color": "#fff", "--swiper-pagination-color": "#fff" }} loop={true} navigation={true} thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }} modules={[FreeMode, Navigation, Thumbs]} className='mySwiper2' >
                {photos.map((image) => (
                    <SwiperSlide key={image} >
                        <img src={`/propertypic/${image}`} alt="" />
                    </SwiperSlide>
                ))}
            </Swiper>
            <Divider marginY={"1rem"} />
            <Swiper onSwiper={setThumsSwiper} loop={true} spaceBetween={10} slidesPerView={5} freeMode={true} watchSlidesProgress={true} modules={[FreeMode, Navigation, Thumbs]} className='mySwiper'>
                {photos.map((image) => (
                    <SwiperSlide key={image} >
                        <img src={`/propertypic/${image}`} alt="" />
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    )
}

export default PropertyThumbnailSlider