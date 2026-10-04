import type {NextFunction, Response, Request} from "express";
import postService from "./post.service";
import {Types} from "mongoose";

export const createPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const createdPost = await postService.create(req.body, new Types.ObjectId((req as any).user._id));
        // send response
        return res.status(201).json({message: "Post created successfully.", success: true, data: {createdPost}});
    } catch (error) {
        next(error);
    }
}


export const reaction = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await postService.addReaction(req.body, new Types.ObjectId((req as any).user._id))
        return res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}

export const getSinglePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const post = await postService.getSinglePost(req.params.id as string);
        return res.status(200).json({ success: true, data: post });
    } catch (error) {
        next(error);
    }
}

export const deletePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await postService.deletePost(req.params.id as string, (req as any).user._id.toString());
        return res.status(200).json({ success: true, message: result.message });
    } catch (error) {
        next(error);
    }
}

export const getProfilePosts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const posts = await postService.getProfilePosts(req.params.userId as string);
        return res.status(200).json({ success: true, data: posts });
    } catch (error) {
        next(error);
    }
}

export const getNewsFeed = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const feed = await postService.getNewsFeed((req as any).user._id.toString());
        return res.status(200).json({ success: true, data: feed });
    } catch (error) {
        next(error);
    }
}