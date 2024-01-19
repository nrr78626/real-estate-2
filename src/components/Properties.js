"use client"
import PropertyCard from '@/Features/common/module/PropertyCard'
import React from 'react'

const Properties = ({property}) => {
  
  return (
    <>
      {property.map(()=>(
        <PropertyCard/>
      ))}
    </>
  )
}

export default Properties