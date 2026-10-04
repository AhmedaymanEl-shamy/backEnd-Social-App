import { Request, Response, NextFunction } from 'express';
import userService from "./user.service";

export const uploadProfilePic = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file provided' });
        }
        //@ts-ignore
        const userId = req.user?._id;
        if (!userId) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }

        const signedUrl = await userService.uploadProfilePic(req.file, userId);


        res.json({
            success: true,
            message: 'Profile picture upload URL generated successfully',
            data: {
                signedUrl
            }
        });
    } catch (error) {
        next(error);
    }
};

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        //@ts-ignore
        const userId = req.user?._id;
        if (!userId) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }

        const data = await userService.profile(userId);

        res.json({
            success: true,
            message: 'Profile fetched successfully',
            data
        });
    } catch (error) {
        next(error);
    }
};