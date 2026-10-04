import { GraphQLString, GraphQLList } from "graphql";
import { PostType } from "./post.type";
import postService from "../post.service";

export const postQuery = {
    post: {
        type: PostType,
        args: {
            postId: { type: GraphQLString }
        },
        resolve: async (_: any, args: { postId: string }, context: any) => {
            if (!context.userId) {
                throw new Error("Unauthorized: Please authenticate.");
            }
            if (!args.postId) {
                throw new Error("postId is required.");
            }
            return await postService.getSinglePost(args.postId);
        }
    },
    newsFeed: {
        type: new GraphQLList(PostType),
        resolve: async (_: any, args: any, context: any) => {
            if (!context.userId) {
                throw new Error("Unauthorized: Please authenticate.");
            }
            return await postService.getNewsFeed(context.userId);
        }
    }
};
