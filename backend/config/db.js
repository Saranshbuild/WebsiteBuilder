import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Db connected")
    }
    catch (error) {
        console.log("error is: " + error)
    }
}

export default connectDB;