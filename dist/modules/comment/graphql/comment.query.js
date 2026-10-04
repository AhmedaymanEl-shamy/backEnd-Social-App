"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentQuery = void 0;
const graphql_1 = require("graphql");
const comment_type_1 = require("./comment.type");
const comment_service_1 = __importDefault(require("../comment.service"));
exports.commentQuery = {
    comments: {
        type: new graphql_1.GraphQLList(comment_type_1.CommentType),
        args: {
            postId: { type: graphql_1.GraphQLString },
            parentId: { type: graphql_1.GraphQLString }
        },
        resolve: async (_, args, context) => {
            if (!context.userId) {
                throw new Error("Unauthorized: Please authenticate.");
            }
            return await comment_service_1.default.getAll(args);
        }
    }
};
