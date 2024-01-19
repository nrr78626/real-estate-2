import Property from "@/models/Property";
import mongoose from "mongoose";
import { fetchuser } from "@/middleware/fetchuser";
import { NextResponse } from "next/server";
import { roles } from "@/models/contstance/userConstaants";

export async function PUT(request) {
    let success = false
    try {
        await mongoose.connect(process.env.NEXT_PUBLIC_DATABASE)

        const adminUser = await fetchuser(request)

        if (!adminUser.id) {
            return NextResponse.json({ success, msg: "Unauthorised" }, { status: 401 })
        }

        if (adminUser.role == roles.user) {
            return NextResponse.json({ success, msg: "Not authorised" }, { status: 401 })
        }

        const params = await request.nextUrl.searchParams
        const assetid = params.get("assetid")

        const myProperty = await Property.findById({ _id: assetid })

        if (!myProperty._id) {
            return NextResponse.json({ success, msg: "Not found" }, { status: 404 })
        }

        if (adminUser.id != myProperty.agent_Id) {
            return NextResponse.json({ success, msg: "Not Authorised" }, { status: 401 })
        }

        const data = await request.json()

        const newProperty = {
            amenities: [{}],
            ownerDetails: {}
        }



        const { purpose, propertyType, title, address, rooms, baths, price, sqft, description, condition, airCondition, balcony_or_terrace, gym_or_health_club, swimmingPool, jacuzzi, sauna, steam_Room, maintenance_staff, securityStaff, coverVideo, email, mobile, fullname, status } = data

        if (address) { newProperty.address = address }
        if (propertyType) { newProperty.propertyType = propertyType }
        if (price) { newProperty.price = price }
        if (title) { newProperty.title = title }
        if (rooms) { newProperty.rooms = rooms }
        if (baths) { newProperty.baths = baths }
        if (sqft) { newProperty.sqft = sqft }
        if (description) { newProperty.description = description }
        if (mobile) { newProperty.ownerDetails.mobile = mobile }
        if (fullname) { newProperty.ownerDetails.fullname = fullname }
        if (email) { newProperty.ownerDetails.email = email }
        if (condition) { newProperty.amenities[0].condition = condition }
        if (airCondition) { newProperty.amenities[0].airCondition = airCondition }
        if (balcony_or_terrace) { newProperty.amenities[0].balcony_or_terrace = balcony_or_terrace }
        if (gym_or_health_club) { newProperty.amenities[0].gym_or_health_club = gym_or_health_club }
        if (swimmingPool) { newProperty.amenities[0].swimmingPool = swimmingPool }
        if (sauna) { newProperty.amenities[0].sauna = sauna }
        if (steam_Room) { newProperty.amenities[0].steam_Room = steam_Room }
        if (maintenance_staff) { newProperty.amenities[0].maintenance_staff = maintenance_staff }
        if (securityStaff) { newProperty.amenities[0].securityStaff = securityStaff }
        if (jacuzzi) { newProperty.amenities[0].jacuzzi = jacuzzi }
        if (purpose) { newProperty.purpose = purpose }
        if (status) { newProperty.status = status }
        if (coverVideo) { newProperty.coverVideo = coverVideo }

        const updatedProperty = await Property.findByIdAndUpdate(myProperty._id, { $set: newProperty }, { new: true })

        success = true
        return NextResponse.json({ success, msg: "Updated", updatedProperty }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ success, msg: "Internal Server Error" }, { status: 500 })
    }
}