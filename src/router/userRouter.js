import express from "express"
import validator from "validator";
import { buildErrorResponse, buildSuccessResponse } from "../utility/responseHelper.js";
import { comparePassword, hashPassword } from "../utility/bcryptHelper.js";
import { createUser, findUserByEmail, getAllUser, getOneUser, updateUser } from "../Models/users/userModels.js";
import { generateJWTs } from "../utility/jwtHelper.js";


const userRouter = express.Router()

userRouter.post("/register", async (req,res)=>{
    try {
        
        const {name, email, password} = req.body;

        console.log(name);
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

    //    const JWT =  await generateJWTs(email)
      
        const user = await createUser({
            name, email, password: encryptPassword

        })

        const userResponse = {
            name: user?.name,
            email: user?.email,
            token: user?.refreshJWT
        }

        return user?._id 
        ? buildSuccessResponse(res, userResponse, "User created Successfully")
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

        // if(!email || !password){
        //     return buildErrorResponse(res, "All field must be filled")
        // }

        const user = await findUserByEmail(email);
       

        if(!user?._id){
            return buildErrorResponse(res, "User account does not exist!")
        }

        const isPasswordMatch = comparePassword(password, user.password)
        

        if(!isPasswordMatch){
            return buildErrorResponse(res, "Invalid Credentials")
        }

        if(isPasswordMatch){
            const refreshJWT = await generateJWTs(user?.email)

          
      

            // update use with tokem 

            const updateUserWithJWT = await updateUser({ _id: user._id}, {refreshJWT})

            if(updateUserWithJWT?._id){
                return buildSuccessResponse(res, updateUserWithJWT, "Logged in Successfully")
            }

            return buildErrorResponse(res, "Something Went Wrong")
        }

        return buildErrorResponse(res, "Invalid Credentials")


    } catch (error) {
        console.log(error);
    }
})


// get one user 

userRouter.get("/find/:userId", async(req, res)=>{
    try {
        const {userId} = req.params
       

        const user = await getOneUser(userId)

        user?._id
        ? buildSuccessResponse(res, user, "User")
        : buildErrorResponse(res, "Can't find")

    } catch (error) {
        return buildErrorResponse(res, "can't find")
    }
})


// get all User 

userRouter.get("/getalluser", async(req, res)=>{

    try {
        const getAllUsers = await getAllUser()

        res.status(200).json(getAllUsers)
    } catch (error) {
        res.status(500).json(error)
    }
})


export default userRouter