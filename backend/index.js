import express from "express";
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import websiteRoute from "./routes/websiteRoute.js";
import paymentRoute from "./routes/paymentRoute.js";

const app = express();

app.use(express.json());


app.use(cors({
    origin: "https://websitebuilder-1-75l0.onrender.com",
    credentials: true
}));

app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use('/api/website',websiteRoute)
app.use('/api/payment',paymentRoute)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    connectDB();
});
