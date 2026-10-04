"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNotification = exports.markAsRead = exports.getSingleNotification = exports.getNotifications = void 0;
const notification_service_1 = __importDefault(require("./notification.service"));
const getNotifications = async (req, res, next) => {
    try {
        const userId = (req.user._id || req.user.id);
        const notifications = await notification_service_1.default.getUserNotifications(userId);
        res.status(200).json({ success: true, data: notifications });
    }
    catch (error) {
        next(error);
    }
};
exports.getNotifications = getNotifications;
const getSingleNotification = async (req, res, next) => {
    try {
        const userId = (req.user._id || req.user.id);
        const notification = await notification_service_1.default.getSingleNotification(req.params.id, userId);
        res.status(200).json({ success: true, data: notification });
    }
    catch (error) {
        next(error);
    }
};
exports.getSingleNotification = getSingleNotification;
const markAsRead = async (req, res, next) => {
    try {
        const userId = (req.user._id || req.user.id);
        await notification_service_1.default.markAsRead(req.params.id, userId);
        res.status(200).json({ success: true, message: "Notification marked as read" });
    }
    catch (error) {
        next(error);
    }
};
exports.markAsRead = markAsRead;
const deleteNotification = async (req, res, next) => {
    try {
        const userId = (req.user._id || req.user.id);
        await notification_service_1.default.deleteNotification(req.params.id, userId);
        res.status(200).json({ success: true, message: "Notification deleted successfully" });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteNotification = deleteNotification;
