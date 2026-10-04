import {model, Schema} from "mongoose";
import {IFriendship} from "../../../common/interfaces/friend.interface";

const schema = new Schema<IFriendship>({
    user1: {type: Schema.Types.ObjectId, ref: "User", required: true},
    user2: {type: Schema.Types.ObjectId, ref: "User", required: true},
}, {timestamps: true});

export const Friendship = model("Friendship", schema);
