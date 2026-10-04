"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationRepo = exports.NotificationRepository = void 0;
const abstract_repository_1 = require("../../abstract.repository");
const notification_model_1 = require("./notification.model");
class NotificationRepository extends abstract_repository_1.AbstractRepository {
    constructor() {
        super(notification_model_1.Notification);
    }
}
exports.NotificationRepository = NotificationRepository;
exports.notificationRepo = new NotificationRepository();
