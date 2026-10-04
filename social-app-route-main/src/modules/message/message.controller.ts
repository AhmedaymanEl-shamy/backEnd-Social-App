import { Request, Response, NextFunction } from "express";
import messageService from "./message.service";

export const createMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // @ts-ignore
        const userId = (req.user?._id || req.user?.id) as string;
        
        await messageService.createMessage(req.body, userId);
        
        return res.status(201).json({success: true, message: "Message sent successfully"});
    } catch (error) {
        next(error);
    }
};
