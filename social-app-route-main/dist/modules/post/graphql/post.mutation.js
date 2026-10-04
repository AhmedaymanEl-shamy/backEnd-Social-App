"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postMutation = void 0;
const graphql_1 = require("graphql");
const post_type_1 = require("./post.type");
const post_service_1 = __importDefault(require("../post.service"));
const mongoose_1 = require("mongoose");
exports.postMutation = {
    addPost: {
        type: post_type_1.PostType,
        args: {
            content: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
            attachments: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) }
        },
        resolve: async (_, args, context) => {
            if (!context.userId) {
                throw new Error("Unauthorized: Please authenticate.");
            }
            // using existing create post service
            return await post_service_1.default.create(args, new mongoose_1.Types.ObjectId(context.userId));
        }
    },
    deletePost: {
        type: graphql_1.GraphQLString,
        args: {
            postId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) }
        },
        resolve: async (_, args, context) => {
            if (!context.userId) {
                throw new Error("Unauthorized: Please authenticate.");
            }
            const result = await post_service_1.default.deletePost(args.postId, context.userId);
            return result.message;
        }
    }
};
