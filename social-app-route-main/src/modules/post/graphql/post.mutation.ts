import { GraphQLList, GraphQLNonNull, GraphQLString } from "graphql";
import { PostType } from "./post.type";
import postService from "../post.service";
import { Types } from "mongoose";

export const postMutation = {
    addPost: {
        type: PostType,
        args: {
            content: { type: new GraphQLNonNull(GraphQLString) },
            attachments: { type: new GraphQLList(GraphQLString) }
        },
        resolve: async (_: any, args: any, context: any) => {
            if (!context.userId) {
                throw new Error("Unauthorized: Please authenticate.");
            }
            return await postService.create(args, new Types.ObjectId(context.userId));
        }
    },
    deletePost: {
        type: GraphQLString,
        args: {
            postId: { type: new GraphQLNonNull(GraphQLString) }
        },
        resolve: async (_: any, args: { postId: string }, context: any) => {
            if (!context.userId) {
                throw new Error("Unauthorized: Please authenticate.");
            }
            const result = await postService.deletePost(args.postId, context.userId);
            return result.message;
        }
    }
};
