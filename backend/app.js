import express from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";
import userRouter from './routes/user.route.js';

const app = express();

// Middleware
app.use(cors({
    origin: process.env.cors_origin || "*", 
    credentials: true,
}));







app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
app.use(express.static("public"));

// Routes
app.use("/api/v1/users", userRouter);

export default app; 
