import { model, Schema } from "mongoose";
import { IChat } from "../../../common/interfaces/chat.interface";
import { ChatType } from "../../../common/types/chat.type";

const modelSchema = new Schema<IChat>({
   participants: {type: [Schema.Types.ObjectId], ref: "User", required: true},
   chatType: {type: String, enum: ChatType, default: ChatType.private},
   admin: {type: [Schema.Types.ObjectId], ref: "User", required: function (this: any) {
    return this.chatType == ChatType.group
   }} 
},{timestamps:true})

export const Chat = model("Chat", modelSchema)
