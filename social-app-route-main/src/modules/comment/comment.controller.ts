import type {NextFunction, Request, Response} from "express";
import {Types} from "mongoose";
import commentService from "./comment.service";
import addReactionService from "../../common/services/add-Reaction.service";
import {commentRepo} from "../../DB/models/comment/comment.repository";

export const createComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await commentService.create(req.body, req.params, new Types.ObjectId((req as any).user._id));
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}


export const addReaction = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await addReactionService(req.body, new Types.ObjectId((req as any).user._id), commentRepo);
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}

export const getAll = async (req: Request, res: Response, next: NextFunction) => {

    const comments = await commentService.getAll(req.params)

    res.status(200).send({success: true, message: "Comments retrieve Successfully", data: comments})
}

export const getAllComments = async (req: Request, res: Response, next: NextFunction) => {
    const comments = await commentService.getAllComments();
    res.status(200).send({success: true, message: "Comments retrieved successfully", details: comments});
}

export const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const userId = ((req as any).user._id || (req as any).user.id) as string;
        
        await commentService.deleteComment(id as string, userId);
        res.status(200).send({success: true, message: "Comment deleted successfully"});
    } catch (error) {
        next(error);
    }
}

export const updateComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const userId = ((req as any).user._id || (req as any).user.id) as string;
        
        await commentService.updateComment(id as string, req.body, userId);
        res.status(200).send({success: true, message: "Comment updated successfully"});
    } catch (error) {
        next(error);
    }
}