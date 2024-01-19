"use client"
import FeaturedProperties from "@/Features/Home/components/FeaturedProperties/FeaturedProperties";
import HeroBanner from "@/Features/Home/components/HeroBanner";
import MeetTheTeams from "@/Features/Home/components/MeetTheTeams";
import Partners from "@/Features/Home/components/Partners";
import Testimonials from "@/Features/Home/components/Testimonials";
import DefaultLayout from "@/Features/Layouts/DefaultLayouts/DefaultLayout";
import { useSelector, useDispatch } from "react-redux"
import { getAllProperties } from "@/store/Slices/Properties/propertiesSlices";
import { useEffect } from "react";

export default function Home() {
  const dispatch = useDispatch()
  const property = useSelector(state => state.properties.properties)

  useEffect(() => {
    dispatch(getAllProperties())
  }, [])
  return (
    <DefaultLayout>
      <HeroBanner />
      <FeaturedProperties featuredProps={property.slice(0, 5)} />
      <MeetTheTeams />
      <Partners />
      <Testimonials />
    </DefaultLayout>
  )
}


