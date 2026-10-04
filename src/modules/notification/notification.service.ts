import { notificationRepo } from "../../DB/models";
import { NotFoundException } from "../../common";
import { Types } from "mongoose";

class NotificationService {
    async getUserNotifications(userId: string) {
        return await notificationRepo.getAll({ userId: new Types.ObjectId(userId) });
    }

    async getSingleNotification(id: string, userId: string) {
        const notification = await notificationRepo.getOne({ _id: new Types.ObjectId(id), userId: new Types.ObjectId(userId) });
        if (!notification) {
            throw new NotFoundException("Notification not found");
        }
        return notification;
    }

    async markAsRead(id: string, userId: string) {
        const notification = await notificationRepo.getOne({ _id: new Types.ObjectId(id), userId: new Types.ObjectId(userId) });
        if (!notification) {
            throw new NotFoundException("Notification not found");
        }
        return await notificationRepo.updateOne({ _id: new Types.ObjectId(id) }, { isRead: true });
    }

    async deleteNotification(id: string, userId: string) {
        const notification = await notificationRepo.getOne({ _id: new Types.ObjectId(id), userId: new Types.ObjectId(userId) });
        if (!notification) {
            throw new NotFoundException("Notification not found");
        }
        return await notificationRepo.deleteOne({ _id: new Types.ObjectId(id) });
    }
}

export default new NotificationService();
