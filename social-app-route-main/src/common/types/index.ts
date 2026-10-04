import {IUser} from "../interfaces";
import {Document} from "mongoose";

export type UserDoc = IUser & Document;
export * from "./chat.type";