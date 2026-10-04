import {Types} from "mongoose";
import {ON_MODEL, SYS_REACTION} from "../enums";

export interface IUserReaction {
    userId: Types.ObjectId;
    refId: Types.ObjectId; // post/comment ...etc
    onModel: ON_MODEL;
    reaction: SYS_REACTION
}