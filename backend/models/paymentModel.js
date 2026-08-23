import mongoose from "mongoose"

const paymentSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    planId:{
        type:String,
        required:true
    },
    amount:Number,
    credits:Number,
    razorpayOrderId:String,
    razorpayPaymentId:String,
    status:{
        type:String,
        enum:["pending","success","failed"],
        default:"pending"
    }
    
},{timestamps:true})

export const Payment = mongoose.model("Payment",paymentSchema)