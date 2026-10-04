import { GraphQLString, GraphQLList } from "graphql";
import { CommentType } from "./comment.type";
import commentService from "../comment.service";

export const commentQuery = {
    comments: {
        type: new GraphQLList(CommentType),
        args: {
            postId: { type: GraphQLString },
            parentId: { type: GraphQLString }
        },
        resolve: async (_: any, args: { postId?: string, parentId?: string }, context: any) => {
            if (!context.userId) {
                throw new Error("Unauthorized: Please authenticate.");
            }
            return await commentService.getAll(args);
        }
    }
};
