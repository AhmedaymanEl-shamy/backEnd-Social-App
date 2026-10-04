import { GraphQLString } from "graphql";
import { UserType } from "./user.type";
import userService from "../user.service";

export const userGQLQuery = {
    userProfile: {
        type: UserType,
        args: {
            userId: { type: GraphQLString }
        },
        resolve: async (_: any, args: { userId?: string }, context: any) => {
            const targetUserId = args.userId || context.userId;
            if (!targetUserId) {
                throw new Error("Unauthorized: Please provide a userId or authenticate.");
            }
            const data = await userService.profile(targetUserId);
            return data.user;
        }
    }
};
