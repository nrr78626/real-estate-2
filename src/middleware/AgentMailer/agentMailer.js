import NodeMailer from "nodemailer"
import { NextResponse } from "next/server"

export async function AgentMailer(agentName,fullname, email, contact, assetAddress, ownerName, ownerNumber, ownerEmail, assetPrice) {
    let agentMail = ` Hello ${agentName},
    
    We have sent you this email in response to Mr. ${fullname} looking for Property on Triviska Property.

    To connect ${fullname}, please find below details:
    
    Client Details :

    Email : ${email}

    Contact : ${contact}

    Property Details : 

    Price : ${assetPrice}

    Address : ${assetAddress}

    Owner Details :

    Name : ${ownerName}

    Number : ${ownerNumber}

    Email : ${ownerEmail}
    
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
            html: agentMail
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