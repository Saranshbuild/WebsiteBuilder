import razorpayInstance from "../config/razorpay.js"
import { Payment } from "../models/paymentModel.js"
import { User } from "../models/userModel.js";
import crypto from "crypto"


export const createOrder = async (req, res) => {
    try {
        const { planId, amount, credits } = req.body
        if (!amount || !credits) {
            return resizeBy.status(400).json({ message: "Invalid plan data" })
        }

        const options = {
            amount: Math.round(Number(amount) * 100), //convert to paise
            currency: "INR",
            receipt: `receipt_${Date.now()}`
        }
        const razorpayOrder = await razorpayInstance.orders.create(options)
        console.log("Razorpay Order Created", razorpayOrder)

        await Payment.create({
            userId: req.user._id,
            planId,
            amount,
            credits,
            razorpayOrderId: razorpayOrder.id,
            status: "pending"
        })

        return res.json(razorpayOrder)

    }
    catch (error) {
        console.error("PAYMENT ORDER ERROR:", error);
        return res.status(500).json({
            message: error.message
        });
    }
}



export const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body

        //handle successfull payment
        const body = razorpay_order_id + "|" + razorpay_payment_id
        const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET_KEY).update(body.toString()).digest("hex")

        if (expectedSignature != razorpay_signature) {
            return res.status(400).json({ message: "Invalid Payment" })
        }

        const payment = await Payment.findOne({ razorpayOrderId: razorpay_order_id })
        if (!payment) {
            return res.status(404).json({ message: "Payment not found" })
        }
        if (payment.status === "paid") {
            return res.status(400).json({ message: "Payment already completed" })
        }
        //update payment record
        payment.status = "success"
        payment.razorpayPaymentId = razorpay_payment_id


        await payment.save()

        //update user credits
        const updateUser = await User.findByIdAndUpdate(
            payment.userId,
            {
                $inc: { credits: payment.credits },
                plan: payment.planId
            },
            { new: true }
        )

        res.json({ sucess: true, message: "Payment verified and credit added", user: updateUser })

    }
    catch (error) {
        console.log("Error in verify payment", error)
        return res.status(500).json({ message: error.message })
    }
}
