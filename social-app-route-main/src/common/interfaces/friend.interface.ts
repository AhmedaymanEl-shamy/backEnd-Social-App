import {Types, Document} from "mongoose";

export interface IFriendRequest extends Document {
    sender: Types.ObjectId;
    receiver: Types.ObjectId;
}

export interface IFriendship extends Document {
    user1: Types.ObjectId;
    user2: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IBlock extends Document {
    blocker: Types.ObjectId;
    blocked: Types.ObjectId;
}
