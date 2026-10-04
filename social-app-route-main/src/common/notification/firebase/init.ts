import {FirebasePushNotificationProvider} from "./firebase.service";

let config: any = {};
try {
    config = require("../../../../config/social-app-c45-firebase-adminsdk-fbsvc-f42baf04fa.json");
} catch (error) {
    console.warn("Firebase credentials not found, push notifications might not work.");
}

export const firebasePushNotificationProvider = new FirebasePushNotificationProvider(config)
