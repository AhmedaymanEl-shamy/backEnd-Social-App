import { model, Schema, Types } from "mongoose";

export interface INotification {
    _id: Types.ObjectId;
    userId: Types.ObjectId;
    title: string;
    body: string;
    isRead: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const notificationSchema = new Schema<INotification>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    isRead: { type: Boolean, default: false }
}, { timestamps: true });

export const Notification = model<INotification>("Notification", notificationSchema);
