import Nodemailer from "nodemailer"
import NextResponse from "next/server"

export async function Mailer(name, email, token) {
    let myMail = `Hello ${name},
    
    We have sent you this email in response to your request to reset your password on Triviska Property.

    To reset your password, please follow the link below:
    
    <a href="http://localhost:3000/Forgetpass?token=${token}" >Click here !</a>
    
    We recommend that you keep your password secure and not share it with anyone. If you feel your password has been compromised, you can change it by going to your My Account Page and clicking on the "Change Password" link.
    
    If you need help, or you have any other questions, feel free to email support@triviska.com, or call customer service toll-free at +918850906168.`

    try {
        const transporter = Nodemailer.createTransport({
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
            subject: "For reset password",
            html: myMail
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


