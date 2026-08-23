import express from "express"

import { createOrder, verifyPayment } from "../controllers/paymentController.js"
import { isAuthenticated } from "../middleware/isAuthenticated.js"


const router = express.Router()

router.post('/order',isAuthenticated,createOrder)
router.post('/verify',isAuthenticated,verifyPayment)

export default router