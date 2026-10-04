"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.firebasePushNotificationProvider = void 0;
const firebase_service_1 = require("./firebase.service");
let config = {};
try {
    config = require("../../../../config/social-app-c45-firebase-adminsdk-fbsvc-f42baf04fa.json");
}
catch (error) {
    console.warn("Firebase credentials not found, push notifications might not work.");
}
exports.firebasePushNotificationProvider = new firebase_service_1.FirebasePushNotificationProvider(config);
