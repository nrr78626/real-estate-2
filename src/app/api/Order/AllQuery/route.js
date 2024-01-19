import mongoose from "mongoose";
import Order from "@/models/Order";
import { fetchuser } from "@/middleware/fetchuser";
import { NextResponse } from "next/server";
import { roles } from "@/models/contstance/userConstaants";

export async function GET(request) {
    let success = false

    try {
        await mongoose.connect(`${process.env.NEXT_PUBLIC_DATABASE}`)

        const loggedUser = await fetchuser(request)

        if (!loggedUser?.id) {
            return NextResponse.json({ success, msg: "Not authorised" }, { status: 401 })
        }

        if (loggedUser.role == roles.user) {
            return NextResponse.json({ success, msg: "Invalid User" }, { status: 401 })
        }

        const queries = await Order.find({})
        success = true
        return NextResponse.json({ success, queries }, { status: 200 })
    } catch (error) {
        return NextResponse.json({error},{status:500})
    }
}