const  usePropertyFormat = (property) => {
    const address = property.location.map((item)=> item.name).join(", ")
    const coverPhoto = property.coverPhoto.url
    const propertyType = `${property.category[0].name}`
    const price = property.price.toLocaleString("en-US", {
        style:"currency",
        currency:"INR",
        maximumFractionDigits:0
    })
    const title = property.title
    const rooms = property.rooms
    const baths = property.baths
    const purpose = property.purpose
    const sqft = property.area.toFixed(2)
    const externalID = property.externalID

    const photos = property.photos?.map((photo)=> photo.url)
    const description = property.description
    const coverVideoUrl = property.coverVideo.url
    const coverVideo = coverVideoUrl.slice(coverVideoUrl.length - 11)
    const panorama = property.panoramas?.length ? property.panoramas[0].url :[];
    const amenities = property.amenities?.flatMap(({amenities})=> amenities).map((item)=> item.text)
    const furnished = property.furnishingStatus

    return {
        address,
        coverPhoto,
        propertyType,
        price,
        title,
        rooms,
        baths,
        purpose,
        sqft,
        externalID,
        photos,
        description,
        coverVideo,
        panorama,
        amenities,
        furnished
    }
}

export default usePropertyFormat