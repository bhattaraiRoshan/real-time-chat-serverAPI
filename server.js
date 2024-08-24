import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectMogooseDB } from "./src/db/dbConnect.js";
import userRouter from "./src/router/userRouter.js";

const PORT = process.env.PORT || 8000;
const app = express();


app.use(express.json())
app.use(cors());

// connnect to db
connectMogooseDB()

// routers
app.use("/api/user", userRouter)

app.listen(PORT, (req,res)=>{
    console.log(`Server running on port ${PORT}`);
})