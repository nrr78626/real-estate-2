import mongoose from "mongoose";
import { propertyStatus } from "./contstance/propertyConstance";
import { conditionOfProperty } from "./contstance/propertyConditionConstance";
import { airConditionStatus } from "./contstance/airconditionConstance";

const propertySchema = new mongoose.Schema({
    agent_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    address: {
        type: String,
        required: true,
        min: 10
    },
    coverPhoto: {
        type: String,
        default: ""
    },
    propertyType: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    rooms: {
        type: Number,
        required: true
    },
    baths: {
        type: Number,
        required: true
    },
    purpose: {
        type: String,
        required: true
    },
    sqft: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    photos: {
        type: Array,
        default: ""
    },
    coverVideo: {
        type: String,
        default: ""
    },
    panorama: {
        type: String,
        default: ""
    },
    status: {
        type: String,
        enum: [propertyStatus.idle, propertyStatus.onRent, propertyStatus.sold],
        default: propertyStatus.idle
    },
    amenities: [
        {
            condition: {
                type: String,
                enum: [conditionOfProperty.furnished, conditionOfProperty.semi_furnished, conditionOfProperty.un_furnished],
                default: conditionOfProperty.furnished
            },
            airCondition: {
                type: String,
                enum: [airConditionStatus.centrally, airConditionStatus.own],
                default: airConditionStatus.own
            },
            balcony_or_terrace: {
                type: String,
                enum: ["Balcony", "Terrace"],
            },
            gym_or_health_club: {
                type: String,
                enum: ["Gym or Health Club"],
            },
            swimmingPool: {
                type: String,
                enum: ["Swimming Pool"],
            },
            jacuzzi: {
                type: String,
                enum: ["Jacuzzi"],
            },
            sauna: {
                type: String,
                enum: ["Sauna"],
            },
            steam_Room: {
                type: String,
                enum: ["Steam Room"],
            },
            maintenance_staff: {
                type: String,
                enum: ["Maintenance Staff"],
            },
            securityStaff: {
                type: String,
                enum: ["Security Staff"],
            },
        }
    ]
    ,
    ownerDetails: {
        fullname: {
            type: String
        },
        mobile: {
            type: Number,
        },
        email: {
            type: String
        }
    }
}, { timestamps: true })

mongoose.models = {}

export default mongoose.model("Property", propertySchema)