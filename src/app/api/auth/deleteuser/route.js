import Users from "@/models/Users";
import fs from "fs"
import { fetchuser } from "@/middleware/fetchuser";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { roles } from "@/models/contstance/userConstaants";

export async function DELETE(request) {
    let success = false

    // try {
        await mongoose.connect(process.env.NEXT_PUBLIC_DATABASE)
        const adminUser = await fetchuser(request)

        if (!adminUser.id) {
            return NextResponse.json({ success, msg: "Unauthorised" }, { status: 401 })
        }

        if (adminUser.role != roles.superuser) {
            return NextResponse.json({ success, msg: "not authorised" }, { status: 401 })
        }

        const params = await request.nextUrl.searchParams
        const userId = params.get("current_user_id")

        const user = await Users.findById({ _id: userId })

        fs.unlink(`public/userPic/${user.userPic}`, (err) => {
            if (err) {
                return NextResponse.json({ success, msg: "DB issue" }, { status: 404 })
            }
        })

        if (!user.id) {
            return NextResponse.json({ success, msg: "User not found" }, { status: 404 })
        }

        const deletedUser = await Users.findByIdAndDelete(user.id)
        success = true
        return NextResponse.json({ success, msg: "Deleted", userId:deletedUser._id }, { status: 200 })
    // } catch (error) {
    //     return NextResponse.json({ success, msg: "Internal Server Error" }, { status: 500 })
    // }
}