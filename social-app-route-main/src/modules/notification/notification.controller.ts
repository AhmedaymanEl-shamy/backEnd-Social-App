import type { Request, Response, NextFunction } from "express";
import notificationService from "./notification.service";

export const getNotifications = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = ((req as any).user._id || (req as any).user.id) as string;
        const notifications = await notificationService.getUserNotifications(userId);
        res.status(200).json({ success: true, data: notifications });
    } catch (error) {
        next(error);
    }
};

export const getSingleNotification = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = ((req as any).user._id || (req as any).user.id) as string;
        const notification = await notificationService.getSingleNotification(req.params.id as string, userId);
        res.status(200).json({ success: true, data: notification });
    } catch (error) {
        next(error);
    }
};

export const markAsRead = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = ((req as any).user._id || (req as any).user.id) as string;
        await notificationService.markAsRead(req.params.id as string, userId);
        res.status(200).json({ success: true, message: "Notification marked as read" });
    } catch (error) {
        next(error);
    }
};

export const deleteNotification = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = ((req as any).user._id || (req as any).user.id) as string;
        await notificationService.deleteNotification(req.params.id as string, userId);
        res.status(200).json({ success: true, message: "Notification deleted successfully" });
    } catch (error) {
        next(error);
    }
};
