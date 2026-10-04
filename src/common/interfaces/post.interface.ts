import {Types} from "mongoose";

export interface IPost {
    userId: Types.ObjectId;
    content?: string;
    attachments?: string[]; // [urls]
    reactsCount: number;
    commentsCount: number;
    sharesCount: number;
}