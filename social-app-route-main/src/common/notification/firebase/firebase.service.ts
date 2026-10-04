import * as admin from "firebase-admin";
import {getMessaging} from "firebase-admin/messaging";
import {INotificationProvider} from "../notification.interface";

export class FirebasePushNotificationProvider implements INotificationProvider {
    private client: admin.App;

    constructor(config: any) {
        this.client = admin.initializeApp({
            credential: admin.cert(config),
        });
    }

    async send(token: string, data: { title: string; body: string }): Promise<void> {
        await getMessaging(this.client).send({
            token,
            data: {
                title: data.title,
                body: data.body,
            },
        });

    }
}