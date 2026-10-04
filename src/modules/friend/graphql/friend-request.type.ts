import { GraphQLID, GraphQLObjectType } from "graphql";
import { UserType } from "../../user/graphql/user.type";
import { userRepo } from "../../../DB/models";
import { Types } from "mongoose";

export const FriendRequestType = new GraphQLObjectType({
    name: "FriendRequestType",
    fields: {
        _id: { type: GraphQLID },
        sender: {
            type: UserType,
            resolve: async (parent: any) => {
                return await userRepo.getOne({ _id: new Types.ObjectId(parent.sender) });
            }
        },
        receiver: {
            type: UserType,
            resolve: async (parent: any) => {
                return await userRepo.getOne({ _id: new Types.ObjectId(parent.receiver) });
            }
        }
    }
});
