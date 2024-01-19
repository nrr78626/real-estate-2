import Order from "@/models/Order";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import Property from "@/models/Property";
import Users from "@/models/Users";
import { AgentMailer } from "@/middleware/AgentMailer/agentMailer";
import { ClientMailer } from "@/middleware/ClientMailer/clientMailer";

export async function POST(request) {
    let success = false
    try {

        await mongoose.connect(`${process.env.NEXT_PUBLIC_DATABASE}`)

        const data = await request.json()

        if (!data) {
            return NextResponse.json({ success, msg: "Invalid Inputs" }, { status: 404 })
        }

        const property = await Property.findOne({ _id: data.initQuery })
        if (!property) {
            return NextResponse.json({ success, msg: "Property not found" }, { status: 404 })
        }

        const agent = await Users.findById({ _id: property.agent_Id })

        if (!agent) {
            return NextResponse.json({ success, msg: "Agent not found" }, { status: 404 })
        }

        const query = new Order({
            fullname: data.fullname,
            contact: data.contact,
            email: data.email,
            assetPic: property.coverPhoto,
            assetPrice:property.price
        })

        await query.save()

        await ClientMailer(data.fullname, data.email)

        await AgentMailer(agent.fullname, data.fullname, data.email, data.contact, property.address, property.ownerDetails.fullname, property.ownerDetails.mobile, property.ownerDetails.email, property.price)

        success = true
        return NextResponse.json({ success, query })
    } catch (error) {
        return NextResponse.json({success,error})
    }
}