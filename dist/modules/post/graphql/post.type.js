"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostType = exports.AttachmentType = void 0;
const graphql_1 = require("graphql");
const user_type_1 = require("../../user/graphql/user.type");
const models_1 = require("../../../DB/models");
const mongoose_1 = require("mongoose");
exports.AttachmentType = new graphql_1.GraphQLObjectType({
    name: "AttachmentType",
    fields: {
        secure_url: { type: graphql_1.GraphQLString },
        public_id: { type: graphql_1.GraphQLString },
    }
});
exports.PostType = new graphql_1.GraphQLObjectType({
    name: "PostType",
    fields: {
        _id: { type: graphql_1.GraphQLID },
        content: { type: graphql_1.GraphQLString },
        attachments: { type: new graphql_1.GraphQLList(exports.AttachmentType) },
        reactsCount: { type: graphql_1.GraphQLInt },
        commentsCount: { type: graphql_1.GraphQLInt },
        sharesCount: { type: graphql_1.GraphQLInt },
        user: {
            type: user_type_1.UserType,
            resolve: async (parent) => {
                return await models_1.userRepo.getOne({ _id: new mongoose_1.Types.ObjectId(parent.userId) });
            }
        }
    }
});
