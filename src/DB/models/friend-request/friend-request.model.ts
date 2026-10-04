import {model, Schema} from "mongoose";
import {IFriendRequest} from "../../../common/interfaces/friend.interface";

const schema = new Schema<IFriendRequest>({
    sender: {type: Schema.Types.ObjectId, ref: "User", required: true},
    receiver: {type: Schema.Types.ObjectId, ref: "User", required: true},
}, {timestamps: true});

export const FriendRequest = model("FriendRequest", schema);
