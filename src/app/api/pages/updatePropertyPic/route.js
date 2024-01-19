import Property from "@/models/Property";
import mongoose from "mongoose";
import { fetchuser } from "@/middleware/fetchuser";
import { NextResponse } from "next/server";
import { roles } from "@/models/contstance/userConstaants";
import fs, { writeFile } from "fs"
import { join } from "path";

export async function PUT(request) {
    let success = false

    try {
        await mongoose.connect(process.env.NEXT_PUBLIC_DATABASE)

        const adminUser = await fetchuser(request)

        if (!adminUser.id) {
            return NextResponse.json({ success, msg: "Not Authorised" }, { status: 401 })
        }

        if (adminUser.role == roles.user) {
            return NextResponse.json({ success, msg: "Unauthorised" }, { status: 401 })
        }

        const params = await request.nextUrl.searchParams
        const assetid = await params.get("assetid")

        if (!assetid) {
            return NextResponse.json({ success, msg: "Not found" }, { status: 404 })
        }

        const myProperty = await Property.findById({ _id: assetid })

        if (adminUser.id != myProperty.agent_Id) {
            return NextResponse.json({ success, msg: "Not Allowd" }, { status: 401 })
        }
        const data = await request.formData()

        let myProp = []

        for (const entry of Array.from(data.entries())) {
            const [key, value] = entry

            const isFile = typeof value == "object";

            if (isFile) {
                const blob = value
                const filename = blob.name
                const buffer = Buffer.from(await blob.arrayBuffer())

                if (blob.type != "image/jpeg") {
                    return NextResponse.json({ success, msg: "Not Supported" }, { status: 501 })
                }


                const propertyFileName = await key + "_" + new Date().getFullYear() + new Date().getTime() + new Date().getDate() + new Date().getMinutes() + new Date().getSeconds() + Math.floor(Math.random() * 100) + 100 + "_" + filename

                const saveLocation = join(`${process.cwd()}\\public`, 'propertypic', propertyFileName)

                await writeFile(saveLocation, buffer, err => {
                    if (err) {
                        return NextResponse.json({ err })
                    }
                    fs.unlink(`public/propertypic/${myProperty.photos}`, (err) => {
                        if (err) {
                            return NextResponse.json({ success, msg: "DB issue" }, { status: 404 })
                        }
                    })
                })

                myProp.push(propertyFileName)
            }

        }

        let newUpdatedAvatar = {}

        if (myProp) { newUpdatedAvatar.photos = myProp }
        const updatedPropertyAvatar = await Property.findByIdAndUpdate(myProperty._id, { $set: newUpdatedAvatar }, { new: true })
        success = true
        return NextResponse.json({ success, msg: "Updated" })

    } catch (error) {
        return NextResponse.json({ success, msg: "Internal Server Error" })
    }
}