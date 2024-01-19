import { NextResponse } from "next/server";
import Users from "@/models/Users";
import randomString from "randomstring"
import mongoose from "mongoose";
import { Mailer } from "../Nodemailer/Mailer";
import jwt from "jsonwebtoken"

export async function POST(request) {
    let success = false

    const { email } = await request.json()

    if (!email) {
        return NextResponse.json({ success, msg: "Not found" }, { status: 404 })
    }

    await mongoose.connect(process.env.NEXT_PUBLIC_DATABASE)

    let user = await Users.findOne({ email })

    if (!user) {
        return NextResponse.json({ success, msg: "Not found" }, { status: 404 })
    }

    const randStr = randomString.generate()

    const payload = {
        token : randStr
    }

    const resetToken = jwt.sign(payload, process.env.NEXT_PUBLIC_JWTSEC, { expiresIn: 300 })

    user = await Users.findByIdAndUpdate(user._id, { $set: { token: randStr } }, { new: true })

    await Mailer(user.fullname, user.email, resetToken)
    success = true
    return NextResponse.json({ success, msg: "Please check your mailbox" })
}