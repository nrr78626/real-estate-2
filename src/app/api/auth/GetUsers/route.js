import Users from "@/models/Users";
import { NextResponse } from "next/server";
import { fetchuser } from "@/middleware/fetchuser";
import mongoose from "mongoose";
import { roles } from "@/models/contstance/userConstaants";

export async function GET(request) {
    let success = false

    try {
        await mongoose.connect(`${process.env.NEXT_PUBLIC_DATABASE}`)
        const admin = await fetchuser(request)
        if (!admin.id) {
            return NextResponse.json({ success, msg: "Not allowd" })
        }

        if (!admin.role == roles.user) {
            return NextResponse.json({ success, msg: "Not allowd" })
        }
        const users = await Users.find({})
        return NextResponse.json({ users })
    } catch (error) {
        return NextResponse.json({ error })
    }
}