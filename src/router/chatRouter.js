import express from "express"
import chatSchema from "../Models/chatModels/chatSchema.js"
import { buildSuccessResponse } from "../utility/responseHelper.js"
import { buildErrorResponse } from "../utility/responseHelper.js"
import {createUserChat, findUserChatByID, getUserChat} from "../Models/chatModels/chatModels.js"


const chatRouter = express.Router()

// create chat

chatRouter.post("/", async(req, res)=>{

    const {firstId, secondId} = req.body
    console.log(firstId, secondId);

    try {

        const chat = await chatSchema.findOne({
            members: {$all: [firstId, secondId]}
        })

        if(chat?._id){
            return buildSuccessResponse(res, chat, "Chat Found")
        }

        const response = await createUserChat(firstId, secondId)

        if(response?._id){
            return buildSuccessResponse(res, response, "Chat")
        }

        return buildErrorResponse(res, {}, "Something Went Wrong, try again later")



        
    } catch (error) {
        console.log(error)
        return buildErrorResponse(res, error, "Something Went Wrong")
    }
})

// find User chat by ID 

chatRouter.get("/:userId", async(req, res)=>{
    
    try {
        const userId = req.params.userId

      

        

        const chats = await findUserChatByID(userId)
        

        chats 
        ? buildSuccessResponse(res, chats, "Chats Found by ID")
        : buildErrorResponse(res, "Cannot find chat by ID")
        
    } catch (error) {
        return buildErrorResponse(res,"Something Went Wrong")
    }

})


// find Chat 

chatRouter.get("/find/:firstId/:secondId", async(req, res)=>{
    
    try {
        const {firstId, secondId} = req.params

        const chat = await getUserChat(firstId, secondId)
      

        chat?._id 
        ? buildSuccessResponse(res, chat, "Chats Found")
        : buildErrorResponse(res, "Cannot find chat")
        
    } catch (error) {
        return buildErrorResponse(res, error, "Something Went Wrong")
    }

})


export default chatRouter