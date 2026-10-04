import { Request, Response, NextFunction } from "express";
import chatService from "./chat.service";

export const getChat = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.userId as string;
        // @ts-ignore
        const loginUser = (req.user?._id || req.user?.id) as string;
        
        const {chat, messages} = await chatService.getChat(userId, loginUser);
        
        return res.status(200).json({success: true, message: "Chat retrieved successfully", data: {chat, messages}});
    } catch (error) {
        next(error);
    }
};

export const getConversations = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // @ts-ignore
        const userId = (req.user?._id || req.user?.id) as string;
        
        const chats = await chatService.getConversations(userId);
        
        return res.status(200).json({success: true, message: "Conversations retrieved successfully", data: chats});
    } catch (error) {
        next(error);
    }
};
