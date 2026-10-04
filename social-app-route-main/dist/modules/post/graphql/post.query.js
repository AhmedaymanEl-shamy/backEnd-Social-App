"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postQuery = void 0;
const graphql_1 = require("graphql");
const post_type_1 = require("./post.type");
const post_service_1 = __importDefault(require("../post.service"));
exports.postQuery = {
    post: {
        type: post_type_1.PostType,
        args: {
            postId: { type: graphql_1.GraphQLString }
        },
        resolve: async (_, args, context) => {
            if (!context.userId) {
                throw new Error("Unauthorized: Please authenticate.");
            }
            if (!args.postId) {
                throw new Error("postId is required.");
            }
            return await post_service_1.default.getSinglePost(args.postId);
        }
    },
    newsFeed: {
        type: new graphql_1.GraphQLList(post_type_1.PostType),
        resolve: async (_, args, context) => {
            if (!context.userId) {
                throw new Error("Unauthorized: Please authenticate.");
            }
            return await post_service_1.default.getNewsFeed(context.userId);
        }
    }
};
