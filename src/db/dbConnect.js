import mongoose from "mongoose";

export const connectMogooseDB = () =>{
    try {
        const connect = mongoose.connect(process.env.ATLAS_URL)
        if(connect){
            console.log(`Database conected: ${process.env.ATLAS_URL}`);
        }
    } catch (error) {

        console.log(error);
        
    }
}