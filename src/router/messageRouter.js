import express from "express"
import { createMessage, getMessage } from "../Models/message/messageModels.js"
import { buildErrorResponse, buildSuccessResponse } from "../utility/responseHelper.js"

const messageRouter = express.Router()

// create Message 

messageRouter.post("/", async(req,res)=>{

    try {
        const {chatId, senderId, text} = req.body

        const message = await createMessage(chatId, senderId, text)

        message?._id
        ? buildSuccessResponse(res, message, "Message created")
        : buildErrorResponse(res, "Something went Worng, try again later")
    } catch (error) {
        return buildErrorResponse(res, "something went worng")
    }
})


// get message

messageRouter.get("/:chatId", async(req, res)=>{

    try {
        const {chatId} = req.params

        const result = await getMessage(chatId)

        
        result
        ? buildSuccessResponse(res, result, "Message")
        : buildErrorResponse(res, "Something went wrong")
    } catch (error) {
        return buildErrorResponse(res, "something went wrong")
    }

})


export default messageRouter