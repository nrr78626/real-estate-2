import mongoose from "mongoose"
import { roles } from "./contstance/userConstaants"

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contact: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: [roles.admin, roles.user, roles.moderator, roles.superuser],
        default: roles.user
    },
    userPic: {
        type: String,
        default: ""
    },
    token: {
        type: String,
        default: ""
    }
}, { timestamps: true })

userSchema.pre("save", async function (next) {
    try {
        if (this.email === process.env.NEXT_PUBLIC_SUPERUSER.toLowerCase()) {
            this.role = roles.superuser
        }
        next()
    } catch (error) {
        next(error)
    }
})

mongoose.models = {}

export default mongoose.model("User", userSchema)