
import userSchema from "./userSchema.js";

// create a user
export const createUser = (userObj) => {
    return userSchema(userObj).save();
}

// find user by email 

export const findUserByEmail = (email) =>{
    return userSchema.findOne({email})
}

// Update User 

export const updateUser = (filter, updatedUser) => {
    return userSchema.findOneAndUpdate(filter, updatedUser, { new: true });
  };


// get user 

export const getOneUser = (_id) =>{
    return userSchema.findById( _id)
}


// get all user 

export const getAllUser = () =>{
    
    return userSchema.find()
}