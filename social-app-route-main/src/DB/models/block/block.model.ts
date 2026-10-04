import {model, Schema} from "mongoose";
import {IBlock} from "../../../common/interfaces/friend.interface";

const schema = new Schema<IBlock>({
    blocker: {type: Schema.Types.ObjectId, ref: "User", required: true},
    blocked: {type: Schema.Types.ObjectId, ref: "User", required: true},
}, {timestamps: true});

export const Block = model("Block", schema);
