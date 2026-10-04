import { Types } from "mongoose";
import { ChatType } from "../types/chat.type";

export interface IChat {
    participants: Types.ObjectId[];
    chatType: ChatType;
    admin?: Types.ObjectId[];
    groupImage?: string;
    groupName?: string;
    groupId?: string;
}
