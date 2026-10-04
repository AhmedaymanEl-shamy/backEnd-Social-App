"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../DB/models");
const common_1 = require("../../common");
const mongoose_1 = require("mongoose");
class NotificationService {
    async getUserNotifications(userId) {
        return await models_1.notificationRepo.getAll({ userId: new mongoose_1.Types.ObjectId(userId) });
    }
    async getSingleNotification(id, userId) {
        const notification = await models_1.notificationRepo.getOne({ _id: new mongoose_1.Types.ObjectId(id), userId: new mongoose_1.Types.ObjectId(userId) });
        if (!notification) {
            throw new common_1.NotFoundException("Notification not found");
        }
        return notification;
    }
    async markAsRead(id, userId) {
        const notification = await models_1.notificationRepo.getOne({ _id: new mongoose_1.Types.ObjectId(id), userId: new mongoose_1.Types.ObjectId(userId) });
        if (!notification) {
            throw new common_1.NotFoundException("Notification not found");
        }
        return await models_1.notificationRepo.updateOne({ _id: new mongoose_1.Types.ObjectId(id) }, { isRead: true });
    }
    async deleteNotification(id, userId) {
        const notification = await models_1.notificationRepo.getOne({ _id: new mongoose_1.Types.ObjectId(id), userId: new mongoose_1.Types.ObjectId(userId) });
        if (!notification) {
            throw new common_1.NotFoundException("Notification not found");
        }
        return await models_1.notificationRepo.deleteOne({ _id: new mongoose_1.Types.ObjectId(id) });
    }
}
exports.default = new NotificationService();
