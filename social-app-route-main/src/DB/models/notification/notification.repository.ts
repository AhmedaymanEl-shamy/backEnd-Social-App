import { AbstractRepository } from "../../abstract.repository";
import { INotification, Notification } from "./notification.model";

export class NotificationRepository extends AbstractRepository<INotification> {
    constructor() {
        super(Notification);
    }
}

export const notificationRepo = new NotificationRepository();
