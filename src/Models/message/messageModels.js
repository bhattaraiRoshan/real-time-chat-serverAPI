import messageSchema from "./messageSchema.js";

// create Message 

export const createMessage  = (chatId, senderId, text) =>{

    const message = new messageSchema({
        chatId,
        senderId,
        text
    })

    return message.save()
}


// get message 

export const getMessage = (chatId) =>{

    return messageSchema.find({chatId})
}