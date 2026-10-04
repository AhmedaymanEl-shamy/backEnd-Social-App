import { GraphQLID, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { UserType } from "../../user/graphql/user.type";
import { userRepo } from "../../../DB/models";
import { Types } from "mongoose";

export const CommentType = new GraphQLObjectType({
    name: "CommentType",
    fields: {
        _id: { type: GraphQLID },
        content: { type: GraphQLString },
        reactsCount: { type: GraphQLInt },
        postId: { type: GraphQLString },
        parentId: { type: GraphQLString },
        user: {
            type: UserType,
            resolve: async (parent: any) => {
                return await userRepo.getOne({ _id: new Types.ObjectId(parent.userId) });
            }
        }
    }
});
