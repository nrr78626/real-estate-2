import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { headers } from "next/headers";
import { destroyCookie } from "nookies"

export const fetchuser = (request) => {
    try {
        const token = headers().get("authtoken")

        if (!token) {
            return NextResponse.json({ msg: "Not Found" }, { status: 404 })
        }

        const data = jwt.verify(token, process.env.NEXT_PUBLIC_JWTSEC)

        if (!data) {
            destroyCookie(null, "authtoken")
        }

        return data.user
    } catch (error) {
        return NextResponse.json({ msg: "Token not found" }, { status: 404 })
    }
}