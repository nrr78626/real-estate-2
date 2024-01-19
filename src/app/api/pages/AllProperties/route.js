import mongoose from "mongoose";
import Property from "@/models/Property";
import { NextResponse } from "next/server";

export async function GET(request) {
    let success = false
    try {
        await mongoose.connect(`${process.env.NEXT_PUBLIC_DATABASE}`)
        const properties = await Property.find({})

        if (!properties) {
            return NextResponse.json({ success, msg: "Not found" }, { status: 404 })
        }
        success = true
        return NextResponse.json({ properties }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error })
    }
}   