import bcrypt from "bcrypt";

const Salt = 15

export const hashPassword = (plainPassword) =>{
    return bcrypt.hashSync(plainPassword, Salt)
}

export const comparePassword = (plainPassword, hassedPassword) =>{
    return bcrypt.compareSync(plainPassword, hassedPassword)
}