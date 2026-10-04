"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.friendRequestQuery = void 0;
const graphql_1 = require("graphql");
const friend_request_type_1 = require("./friend-request.type");
const friend_request_repository_1 = require("../../../DB/models/friend-request/friend-request.repository");
const mongoose_1 = require("mongoose");
const friendRequestRepo = new friend_request_repository_1.FriendRequestRepository();
exports.friendRequestQuery = {
    pendingRequests: {
        type: new graphql_1.GraphQLList(friend_request_type_1.FriendRequestType),
        resolve: async (_, __, context) => {
            if (!context.userId) {
                throw new Error("Unauthorized: Please authenticate.");
            }
            return await friendRequestRepo.getAll({ receiver: new mongoose_1.Types.ObjectId(context.userId) });
        }
    }
};
