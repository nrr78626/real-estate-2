import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { fetchuser } from "@/middleware/fetchuser";
import Users from "@/models/Users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { roles } from "@/models/contstance/userConstaants";

export async function GET(request) {
    try {
        await mongoose.connect(process.env.NEXT_PUBLIC_DATABASE)

        const admin = await fetchuser(request)

        const user = await Users.findById({ _id: admin.id })

        if (!user) {
            return NextResponse.json({ msg: "Not found" }, { status: 404 })
        }

        if (user.role == roles.user) {
            return NextResponse.json({ msg: "Not Allowd" }, { status: 400 })
        }
        return NextResponse.json({ user })
    } catch (error) {
        return NextResponse.json({ msg: "Internal Server Error" })
    }
}

export async function PUT(request) {
    let success = false

    try {
        await mongoose.connect(process.env.NEXT_PUBLIC_DATABASE)

        const data = await request.json()

        const ad = await fetchuser(request)

        const { fullname, contact, password, myId } = data

        console.log()

        if (myId != ad.id) {
            return NextResponse.json({ success, msg: "Unauthorised" }, { status: 401 })
        }


        let user = await Users.findById({ _id: myId })

        if (!user) {
            return NextResponse.json({ success, msg: "User not found" }, { status: 404 })
        }

        let newUser = {}

        if (fullname) { newUser.fullname = fullname }
        if (contact) { newUser.contact = contact }

        if (password) {
            const salt = await bcrypt.genSalt(10)
            const secPass = await bcrypt.hash(password, salt)
            newUser.password = secPass
        }

        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        }

        const authtoken = jwt.sign(payload, process.env.NEXT_PUBLIC_JWTSEC)
        const updatedUser = await Users.findByIdAndUpdate(user._id, { $set: newUser }, { new: true })
        success = true
        return NextResponse.json({ success, updatedUser }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ msg: "Internal Server Error" })
    }
}