import { NextResponse } from "next/server";
import Users from "@/models/Users";
import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export async function PUT(request) {
    let success = false

    await mongoose.connect(process.env.NEXT_PUBLIC_DATABASE)

    const params = await request.nextUrl.searchParams

    const token = params.get("token")

    if (!token) {
        return NextResponse.json({ success, msg: "Token not found" }, { status: 404 })
    }

    const userId = jwt.verify(token, process.env.NEXT_PUBLIC_JWTSEC, function (err) {
        if (err) {
            return NextResponse.json({ success, msg: "Link expired" })
        }
    })


    // let user = jwt.verify()

    let user = await Users.findOne({ token: userId.token })

    if (!user) {
        return NextResponse.json({ success, msg: "Link expired" }, { status: 403 })
    }

    const { password } = await request.json()

    if (!password) {
        return NextResponse.json({ success, msg: "Invalid input" })
    }

    const salt = await bcrypt.genSalt(10)
    const secPass = await bcrypt.hash(password, salt)

    const newPassword = {}

    if (password) {
        newPassword.password = secPass
    }

    user = await Users.findByIdAndUpdate(user._id, { $set: newPassword, token: "" }, { new: true })
    success = true
    return NextResponse.json({ success, msg: "Updated" })
}