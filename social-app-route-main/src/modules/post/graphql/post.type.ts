import { GraphQLID, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { UserType } from "../../user/graphql/user.type";
import { userRepo } from "../../../DB/models";
import { Types } from "mongoose";

export const AttachmentType = new GraphQLObjectType({
    name: "AttachmentType",
    fields: {
        secure_url: { type: GraphQLString },
        public_id: { type: GraphQLString },
    }
});

export const PostType = new GraphQLObjectType({
    name: "PostType",
    fields: {
        _id: { type: GraphQLID },
        content: { type: GraphQLString },
        attachments: { type: new GraphQLList(AttachmentType) },
        reactsCount: { type: GraphQLInt },
        commentsCount: { type: GraphQLInt },
        sharesCount: { type: GraphQLInt },
        user: {
            type: UserType,
            resolve: async (parent: any) => {
                return await userRepo.getOne({ _id: new Types.ObjectId(parent.userId) });
            }
        }
    }
});
