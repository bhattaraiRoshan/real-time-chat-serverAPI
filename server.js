import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectMogooseDB } from "./src/db/dbConnect.js";
import userRouter from "./src/router/userRouter.js";
import chatRouter from "./src/router/chatRouter.js";
import messageRouter from "./src/router/messageRouter.js";

const PORT = process.env.PORT || 8000;
const app = express();


app.use(express.json())
app.use(cors());

// connnect to db
connectMogooseDB()

// routers
app.use("/api/user", userRouter)
app.use("/api/chats", chatRouter)
app.use("/api/messages", messageRouter)

app.listen(PORT, (req,res)=>{
    console.log(`Server running on port ${PORT}`);
})