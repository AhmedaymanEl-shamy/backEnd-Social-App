import { GraphQLString, GraphQLNonNull } from "graphql";
import { CommentType } from "./comment.type";
import commentService from "../comment.service";
import { Types } from "mongoose";

export const commentMutation = {
    addComment: {
        type: CommentType,
        args: {
            content: { type: new GraphQLNonNull(GraphQLString) },
            postId: { type: new GraphQLNonNull(GraphQLString) },
            parentId: { type: GraphQLString }
        },
        resolve: async (_: any, args: any, context: any) => {
            if (!context.userId) {
                throw new Error("Unauthorized: Please authenticate.");
            }
            return await commentService.create(args, { postId: args.postId, parentId: args.parentId }, new Types.ObjectId(context.userId));
        }
    },
    updateComment: {
        type: GraphQLString,
        args: {
            commentId: { type: new GraphQLNonNull(GraphQLString) },
            content: { type: new GraphQLNonNull(GraphQLString) }
        },
        resolve: async (_: any, args: any, context: any) => {
            if (!context.userId) {
                throw new Error("Unauthorized: Please authenticate.");
            }
            await commentService.updateComment(args.commentId, { content: args.content }, context.userId);
            return "Comment updated successfully";
        }
    },
    deleteComment: {
        type: GraphQLString,
        args: {
            commentId: { type: new GraphQLNonNull(GraphQLString) }
        },
        resolve: async (_: any, args: any, context: any) => {
            if (!context.userId) {
                throw new Error("Unauthorized: Please authenticate.");
            }
            await commentService.deleteComment(args.commentId, context.userId);
            return "Comment deleted successfully";
        }
    }
};
