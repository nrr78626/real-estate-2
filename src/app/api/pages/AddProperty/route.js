import Property from "@/models/Property";
import { fetchuser } from "@/middleware/fetchuser";
import { NextResponse } from "next/server";
import { roles } from "@/models/contstance/userConstaants";
import mongoose from "mongoose";

export async function POST(requset) {
    let success = false
    // try {

    await mongoose.connect(process.env.NEXT_PUBLIC_DATABASE)

    const adminUser = await fetchuser(requset)

    if (!adminUser.id) {
        return NextResponse.json({ success, msg: "User not found" }, { status: 404 })
    }

    if (adminUser.role == roles.user) {
        return NextResponse.json({ success, msg: "Unauthorised" }, { status: 401 })
    }

    const data = await requset.json()

    const property = new Property({
        agent_Id: adminUser.id,
        address: data.address,
        propertyType: data.propertyType,
        price: data.price,
        title: data.title,
        rooms: data.rooms,
        baths: data.baths,
        purpose: data.purpose,
        sqft: data.sqft,
        description: data.description,
        coverVideo: data.coverVideo,
        ownerDetails: {
            fullname: data.fullname,
            email: data.email,
            mobile: data.contact
        },
        amenities: [
            {
                airCondition: data.airCondition,
                condition: data.condition,
                balcony_or_terrace: data.balcony_or_terrace,
                gym_or_health_club: data.gym_or_health_club,
                swimmingPool: data.swimmingPool,
                jacuzzi: data.jacuzzi,
                sauna: data.sauna,
                steam_Room: data.steam_Room,
                maintenance_staff: data.maintenance_staff,
                securityStaff: data.securityStaff
            }
        ]
    })

    await property.save()
    success = true
    return NextResponse.json({ success, msg: "Added", property }, { status: 200 })
    // } catch {
    //     return NextResponse.json({ success, msg: "Internal Server Error" }, { status: 500 })
    // }

}