import jwt from "jsonwebtoken"
import { updateUser } from "../Models/users/userModels.js"

export const generateAccessJWT =  (email) =>{
    const token = jwt.sign({email}, process.env.JWT_ACCESS_SECRET, {
        expiresIn: '30d',
    })

   

    return token
}

// export const generateRefreshJWT = async(email) =>{

//     try {
//         const token = jwt.sign({email}, process.env.JWT_REFRESH_SECRET, {
//             expiresIn: '30d',
//         })

//         await updateUser({email}, {refreshJWT: token})
//         return token
//     } catch (error) {
//         console.log(error);
//     }
// }

// generate tokens 

export const generateJWTs = async(email) =>{

    return{
        accessJWT:   generateAccessJWT(email),
        // refreshJWT: await generateRefreshJWT(email),
    }
}


export const verifyAccessJWT = (accessJWT) =>{
    return jwt.verify(accessJWT, process.env.JWT_ACCESS_SECRET)
}

export const verifyRefreshJWT = (refreshJWT) =>{
    return jwt.verify(refreshJWT, process.env.JWT_REFRESH_SECRET)
}