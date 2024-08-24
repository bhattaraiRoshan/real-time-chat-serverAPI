import express from "express"
import validator from "validator";
import { buildErrorResponse, buildSuccessResponse } from "../utility/responseHelper.js";
import { comparePassword, hashPassword } from "../utility/bcryptHelper.js";
import { createUser, findUserByEmail } from "../Models/users/userModels.js";
import { generateJWTs } from "../utility/jwtHelper.js";


const userRouter = express.Router()

userRouter.post("/register", async (req,res)=>{
    
    try {
        
        const {name, email, password} = req.body;

        if(!name || !email || !password){
            return buildErrorResponse(res, "All field must be filled")
        }

        if(!validator.isEmail(email)){
            return buildErrorResponse(res, "Email must be valid Email")
        }

        if(!validator.isStrongPassword(password)){
            return buildErrorResponse(res, "Password must be a strong")
        }

        const encryptPassword = hashPassword(password)

        const user = await createUser({
            name, email, password: encryptPassword

        })


        return user?._id 
        ? buildSuccessResponse(res, {}, "User created Successfully")
        : buildErrorResponse(res, "Cannot register your account, try again later")



    } catch (error) {

        if(error.code === 11000){
            error.message = "User with this email already exists!!"
          }
      
          buildErrorResponse(res, error.message)
        
    }

})


// user login 

 userRouter.post("/login", async (req, res)=>{
    try {
        const {email, password} = req.body

        if(!email || !password){
            return buildErrorResponse(res, "All field must be filled")
        }

        const user = await findUserByEmail(email);

        if(!user?._id){
            return buildErrorResponse(res, "User account does not exist!")
        }

        const isPasswordMatch = comparePassword(password, user.password)

        if(!isPasswordMatch){
            return buildErrorResponse(res, "Invalid Credentials")
        }

        if(isPasswordMatch){
            const jwt = await generateJWTs(user.email)

            return buildSuccessResponse(res, jwt, "Logged in Successfully")
        }

        return buildErrorResponse(res, "Invalid Credentials")


    } catch (error) {
        console.log(error);
    }
})


// get all user 



export default userRouter