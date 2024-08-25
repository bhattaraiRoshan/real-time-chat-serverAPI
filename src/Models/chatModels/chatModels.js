import chatSchema from "./chatSchema.js";


// createChat 
export const createUserChat = (firstId, secondId) =>{

    const newChat = new chatSchema({
        members: [firstId, secondId]
    })

    return newChat.save()

}

// find User Chat

export const getUserChat = (firstId, secondId) =>{

    return chatSchema.findOne({
        members: {$all: [firstId, secondId]}
    })

}


// find chats 

export const findUserChatByID = (userId) =>{

    return chatSchema.find({members: {$in: [userId]}})

}



