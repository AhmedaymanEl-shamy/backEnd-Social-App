"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentMutation = void 0;
const graphql_1 = require("graphql");
const comment_type_1 = require("./comment.type");
const comment_service_1 = __importDefault(require("../comment.service"));
const mongoose_1 = require("mongoose");
exports.commentMutation = {
    addComment: {
        type: comment_type_1.CommentType,
        args: {
            content: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
            postId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
            parentId: { type: graphql_1.GraphQLString }
        },
        resolve: async (_, args, context) => {
            if (!context.userId) {
                throw new Error("Unauthorized: Please authenticate.");
            }
            return await comment_service_1.default.create(args, { postId: args.postId, parentId: args.parentId }, new mongoose_1.Types.ObjectId(context.userId));
        }
    },
    updateComment: {
        type: graphql_1.GraphQLString,
        args: {
            commentId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
            content: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) }
        },
        resolve: async (_, args, context) => {
            if (!context.userId) {
                throw new Error("Unauthorized: Please authenticate.");
            }
            await comment_service_1.default.updateComment(args.commentId, { content: args.content }, context.userId);
            return "Comment updated successfully";
        }
    },
    deleteComment: {
        type: graphql_1.GraphQLString,
        args: {
            commentId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) }
        },
        resolve: async (_, args, context) => {
            if (!context.userId) {
                throw new Error("Unauthorized: Please authenticate.");
            }
            await comment_service_1.default.deleteComment(args.commentId, context.userId);
            return "Comment deleted successfully";
        }
    }
};
