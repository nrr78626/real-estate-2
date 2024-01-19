import { writeFile } from "fs";
import { NextResponse } from "next/server";
import { join } from "path";
import { fetchuser } from "@/middleware/fetchuser";
import Users from "@/models/Users";
import mongoose from "mongoose";
import fs from "fs"

export async function PUT(request) {
    let success = false
    try {
        await mongoose.connect(process.env.NEXT_PUBLIC_DATABASE)

        const activeUser = await fetchuser(request)

        if (!activeUser.id) {
            return NextResponse.json({ success, msg: "Unauthorised" }, { status: 401 })
        }

        const user = await Users.findById({ _id: activeUser.id })

        const [name] = await request.formData()

        if (!name[1]) {
            return NextResponse.json({ success, msg: "Not found" }, { status: 404 })
        }

        if (name[1].type != "image/jpeg") {
            return NextResponse.json({ success, msg: "Not support" }, { status: 415 })
        }

        if (name[1].size > 3000000) {
            return NextResponse.json({ success, msg: "too large size" }, { status: 415 })
        }


        const bytes = await name[1].arrayBuffer()
        const buffer = Buffer.from(bytes)
        const avatarName = await name[0] + "_" + new Date().getFullYear() + new Date().getTime() + new Date().getDate() + new Date().getMinutes() + new Date().getSeconds() + Math.floor(Math.random() * 100) + 100 + "_" + name[1].name

        const rasta = join(`${process.cwd()}\\public`, 'userPic', avatarName)

        await writeFile(rasta, buffer, err => {
            if (err) {
                return NextResponse.json({ err })
            }

            fs.unlink(`public/userPic/${user.userPic}`, (err) => {
                if (err) {
                    return NextResponse.json({ success, msg: "DB issue" }, { status: 404 })
                }
            })
        })

        const newUserAvatar = {}

        if (name[0]) { newUserAvatar.userPic = avatarName }

        const updatedUserAvatar = await Users.findByIdAndUpdate(activeUser.id, { $set: newUserAvatar }, { new: true })
        success = true
        return NextResponse.json({ success, msg: "Updated", userPic:updatedUserAvatar.userPic }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ success, msg: "Internal Server Error" }, { status: 500 })
    }

}



