import Users from "@/models/Users";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { headers } from "next/headers"
import jwt from "jsonwebtoken"
import { roles } from "@/models/contstance/userConstaants";

export async function PUT(request) {
    let success = false

    try {
        await mongoose.connect(`${process.env.NEXT_PUBLIC_DATABASE}`)
        const header = headers()
        const token = header.get("authtoken")

        if (!token) {
            return NextResponse.json({ success, msg: "Access Denite" }, { status: 400 })
        }

        const payload = jwt.verify(token, process.env.NEXT_PUBLIC_JWTSEC)

        const user = payload.user

        if (user.role == roles.user) {
            return NextResponse.json({ success, msg: "Not allowd" })
        }

        const params = request.nextUrl.searchParams
        const userId = params.get("current_user_id")

        let currentUser = await Users.findById({ _id: userId })

        if (!currentUser) {
            return NextResponse.json({ success, msg: "User not found" }, { status: 404 })
        }

        // if (!currentUser._id == userId) {
        //     return NextResponse.json({ success, msg: "Unauthorised" }, { status: 401 })
        // }

        if (user.id == currentUser._id) {
            return NextResponse.json({ success, msg: "Unauthorised" }, { status: 401 })
        }

        if(currentUser.role == roles.superuser){
            return NextResponse.json({ success, msg: "Not granted" }, { status: 401 })
        }
        const data = await request.json()
        const { role } = data

        if (!role) {
            return NextResponse.json({ success, msg: "Please select role" }, { status: 404 })
        }

        let newRole = {}

        if (role) { newRole.role = role }

        currentUser = await Users.findByIdAndUpdate(currentUser._id, { $set: newRole }, { new: true })

        success = true
        return NextResponse.json({ success, msg: "Updated" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}