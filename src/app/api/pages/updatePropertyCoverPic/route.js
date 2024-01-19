import { writeFile } from "fs";
import { NextResponse } from "next/server";
import { join } from "path";
import { fetchuser } from "@/middleware/fetchuser";
import mongoose from "mongoose";
import fs from "fs"
import { roles } from "@/models/contstance/userConstaants";
import Property from "@/models/Property";

export async function PUT(request) {
    let success = false
    try {
        await mongoose.connect(process.env.NEXT_PUBLIC_DATABASE)
        const adminUser = await fetchuser(request)

        if (!adminUser.id) {
            return NextResponse.json({ success, msg: "Not authorised" }, { status: 401 })
        }

        if (adminUser.role == roles.user) {
            return NextResponse.json({ success, msg: "Not allowd" }, { status: 401 })
        }

        const params = await request.nextUrl.searchParams
        const assetid = params.get("assetid")

        const property = await Property.findById({ _id: assetid })

        if (!property) {
            return NextResponse.json({ success, msg: "Not found" }, { status: 404 })
        }

        if (property.agent_Id != adminUser.id) {
            return NextResponse.json({ success, msg: "Not Allowd" }, { status: 401 })
        }

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

        const rasta = join(`${process.cwd()}\\public`, 'coverpic', avatarName)

        await writeFile(rasta, buffer, err => {
            if (err) {
                return NextResponse.json({ err })
            }
            fs.unlink(`public/coverpic/${property.coverPhoto}`, (err) => {
                if (err) {
                    return NextResponse.json({ success, msg: "DB issue" }, { status: 404 })
                }
            })
        })

        const newCoverPhoto = {}
        if (name[1]) { newCoverPhoto.coverPhoto = avatarName }

        const updatedCovetPhoto = await Property.findByIdAndUpdate(property._id, { $set: newCoverPhoto }, { new: true })
        success = true
        return NextResponse.json({ success, msg: "Updated" }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ success, msg: "Inernal Server Error" }, { status: 500 })
    }
}
