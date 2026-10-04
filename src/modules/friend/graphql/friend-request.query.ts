import { GraphQLList } from "graphql";
import { FriendRequestType } from "./friend-request.type";
import { FriendRequestRepository } from "../../../DB/models/friend-request/friend-request.repository";
import { Types } from "mongoose";

const friendRequestRepo = new FriendRequestRepository();

export const friendRequestQuery = {
    pendingRequests: {
        type: new GraphQLList(FriendRequestType),
        resolve: async (_: any, __: any, context: any) => {
            if (!context.userId) {
                throw new Error("Unauthorized: Please authenticate.");
            }
            return await friendRequestRepo.getAll({ receiver: new Types.ObjectId(context.userId) });
        }
    }
};
