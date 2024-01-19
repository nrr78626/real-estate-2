import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    contact:{
        type:Number,
        required:true
    },
    assetPic:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["Pending","Fulfilled"],
        default:"Pending"
    },
    assetPrice:{
        type:Number,
        required : true
    }
},{timestamps:true})

mongoose.models = {}

export default mongoose.model("Order",orderSchema)