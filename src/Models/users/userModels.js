
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