import { NextResponse } from "next/server";
import Property from "@/models/Property";
import { fetchuser } from "@/middleware/fetchuser";
import { roles } from "@/models/contstance/userConstaants";
import fs from "fs"
import mongoose from "mongoose";

export async function DELETE(request) {
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
        const assetid = params.get("assetid")

        const property = await Property.findById({ _id: assetid })

        if (!property) {
            return NextResponse.json({ success, msg: "Not found" }, { status: 404 })
        }

        if (property.agent_Id != adminUser.id) {
            return NextResponse.json({ success, msg: "Not allowd" }, { status: 401 })
        }

        await fs.unlink(`public/coverpic/${property.coverPhoto}`, (err) => {
            if (err) {
                return NextResponse.json({ success, msg: "Media not found" })
            }
        })

        for (let i in property.photos) {
            await fs.unlink(`public/propertypic/${property.photos[i]}`, (err) => {
                if (err) {
                    return NextResponse.json({ success, msg: "Not found" }, { status: 404 })
                }
                console.log(` ${property.photos[i]} Deleted successfully`)
            })
        }

        const deletedProperty = await Property.findByIdAndDelete(property._id)
        success = true
        return NextResponse.json({ success, msg: "Deleted",deletedProperty }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ success, msg: "Internal Server Error" })
    }
}