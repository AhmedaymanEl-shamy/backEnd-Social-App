// post is a class that represent database tables
import { model, Schema } from "mongoose";
import { IUser, SYS_GENDER, SYS_ROLE } from "../../../common";


const schema = new Schema<IUser>({
    username: { type: String, required: true, minlength: 2, maxLength: 25 },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: false },
    role: { type: Number, enum: SYS_ROLE, default: SYS_ROLE.user },
    gender: { type: Number, enum: SYS_GENDER, default: SYS_GENDER.male },
    profilePicture: { type: String, required: false },
    numberOfTries: { type: Number, default: 0 },
    lockUntil: { type: Date, default: null },
    credentialsUpdatedAt: { type: Date, default: Date.now },
}, { timestamps: true });
export const User = model<IUser>("User", schema);

