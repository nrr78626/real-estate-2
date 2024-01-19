import NodeMailer from "nodemailer"
import { NextResponse } from "next/server"

export async function ClientMailer(name, email) {

    let clientMail = ` Hello ${name},
    
    Your Query has been submitted we connect you as soos as.
    
    `

    try {
        const transporter = NodeMailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: process.env.NEXT_PUBLIC_EMAIL,
                pass: process.env.NEXT_PUBLIC_PASS
            }
        })

        const mailOptions = {
            from: process.env.NEXT_PUBLIC_EMAIL,
            to: email,
            subject: "Trivishka Property",
            html: clientMail
        }


        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                return NextResponse.json({ msg: err })
            } else {
                return NextResponse.json({ msg: "Message has been sent", info: info.response })
            }
        })
    } catch (error) {
        return NextResponse.json({ msg: error })
    }

}