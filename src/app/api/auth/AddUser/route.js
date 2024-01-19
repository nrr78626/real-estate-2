import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import Users from "@/models/Users"
import mongoose from "mongoose"

export async function POST(request) {
    let success = false
    try {
        await mongoose.connect(`${process.env.NEXT_PUBLIC_DATABASE}`)
        const data = await request.json()

        const { fullname, email, contact, password } = data

        if (!fullname, !email, !contact, !password) {
            return NextResponse.json({ success, msg: "Please fill form" }, { status: 400 })
        }

        let user = await Users.findOne({ email })

        if (user) {
            return NextResponse.json({ success, msg: "Already exists" }, { status: 403 })
        }

        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(password, salt)

        user = new Users({
            fullname: fullname,
            email: email,
            contact: contact,
            password: secPass
        })

        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        }

        const authtoken = jwt.sign(payload, process.env.NEXT_PUBLIC_JWTSEC, {expiresIn:"1d"})
        user.save()
        success = true
        return NextResponse.json({ success, authtoken, user }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ success, msg: "Server Error", error }, { status: 500 })
    }
}
