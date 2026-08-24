import jwt from "jsonwebtoken"
import { User } from "../models/userModel.js"

export const isAuthenticated = async (req, res, next) => {
    try {

        console.log("COOKIE HEADER:", req.headers.cookie)
        console.log("REQ.COOKIES:", req.cookies)

        const token = req.cookies.token

        if (!token) {
            return res.status(400).json({
                message: "token not found"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = await User.findById(decoded.id)

        next()

    } catch (error) {
        console.log("AUTH ERROR:", error)

        return res.status(500).json({
            message: "Invalid token"
        })
    }
}
