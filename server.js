import "dotenv/config";
import express from "express";
import cors from "cors";
const PORT = process.env.PORT || 8000;
const app = express();


app.use(express.json())
app.use(cors());


app.listen(PORT, (req,res)=>{
    console.log(`Server running on port ${PORT}`);
})