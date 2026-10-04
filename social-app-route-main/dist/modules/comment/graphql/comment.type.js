"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentType = void 0;
const graphql_1 = require("graphql");
const user_type_1 = require("../../user/graphql/user.type");
const models_1 = require("../../../DB/models");
const mongoose_1 = require("mongoose");
exports.CommentType = new graphql_1.GraphQLObjectType({
    name: "CommentType",
    fields: {
        _id: { type: graphql_1.GraphQLID },
        content: { type: graphql_1.GraphQLString },
        reactsCount: { type: graphql_1.GraphQLInt },
        postId: { type: graphql_1.GraphQLString },
        parentId: { type: graphql_1.GraphQLString },
        user: {
            type: user_type_1.UserType,
            resolve: async (parent) => {
                return await models_1.userRepo.getOne({ _id: new mongoose_1.Types.ObjectId(parent.userId) });
            }
        }
    }
});
