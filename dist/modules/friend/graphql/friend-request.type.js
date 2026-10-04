"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendRequestType = void 0;
const graphql_1 = require("graphql");
const user_type_1 = require("../../user/graphql/user.type");
const models_1 = require("../../../DB/models");
const mongoose_1 = require("mongoose");
exports.FriendRequestType = new graphql_1.GraphQLObjectType({
    name: "FriendRequestType",
    fields: {
        _id: { type: graphql_1.GraphQLID },
        sender: {
            type: user_type_1.UserType,
            resolve: async (parent) => {
                return await models_1.userRepo.getOne({ _id: new mongoose_1.Types.ObjectId(parent.sender) });
            }
        },
        receiver: {
            type: user_type_1.UserType,
            resolve: async (parent) => {
                return await models_1.userRepo.getOne({ _id: new mongoose_1.Types.ObjectId(parent.receiver) });
            }
        }
    }
});
