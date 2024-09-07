import jwt from "jsonwebtoken"


export const generateJWTToken =  (email) =>{
    const token = jwt.sign({email}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })

   

    return token
}



export const generateJWTs = async(email) =>{


    const token = generateJWTToken(email)

    return token

}

// export const verifyJWTSectet = (token) =>{
//     return jwt.verify(token, process.env.JWT_SECRET)
// }

