"use client"
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Autoplay } from 'swiper/modules';
import PropertyCard from '@/Features/common/module/PropertyCard';
import useIsDesktop from '@/Features/common/Hooks/useIsDesktop';

const PropertySlider = ({ featuredProps }) => {
  const {isDesktop} = useIsDesktop()
  return (
    <>
      <Swiper
        slidesPerView={isDesktop ? 3 : 1}
        spaceBetween={10}
        loop={true}
        // loopFillGroupWithBlank={true}
        autoplay={{ delay: 1000, disableOnInteraction:true }}
        centeredSlides={true}
        pagination={{ dynamicBullets: true }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        {featuredProps.map((property) => (
          <SwiperSlide key={property.id}>
            <PropertyCard {...property} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

export default PropertySlider