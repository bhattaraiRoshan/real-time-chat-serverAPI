import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: 3,
            maxlenght: 30,

        },

        email: {

            type: String,
            required: true,
            unique: true,

        },

        password: {

            type: String,
            required: true,
            minlength: 8,
            maxlenght: 1024
        },
        refreshJWT: {
            type: String,
            default: "",
          },


    },
    {
        timestamps: true,
    }
)

// Users 

export default mongoose.model("User", userSchema)