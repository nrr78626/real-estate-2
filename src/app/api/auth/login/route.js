import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import mongoose from "mongoose";
import Users from "@/models/Users";
import { roles } from "@/models/contstance/userConstaants";
import { cookies } from "next/headers";

export async function POST(request) {
    let success = false
    try {
        await mongoose.connect(`${process.env.NEXT_PUBLIC_DATABASE}`)

        const data = await request.json()

        const { email, password } = data

        let user = await Users.findOne({ email })

        if (!user) {
            return NextResponse.json({ success, msg: "Worng Details" },{status:404})
        }

        if (user.role == roles.user) {
            return NextResponse.json({ success, msg: "Unable to login" },{status:401})
        }

        const compPass = await bcrypt.compare(password, user.password)

        if (!compPass) {
            return NextResponse.json({ success, msg: "wrong details" },{status:401})
        }

        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        }

        const authtoken = jwt.sign(payload, process.env.NEXT_PUBLIC_JWTSEC, { expiresIn: "1d" })
        // cookies().set({name:"authtoken",value:authtoken,httpOnly:true,path:"/"})
        success = true
        return NextResponse.json({ success, msg: "Logged in", authtoken },{status:200})
    } catch (error) {
        return NextResponse.json({ success, error, msg: "Internal server error" },{status:500})
    }
}