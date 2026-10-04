"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userGQLQuery = void 0;
const graphql_1 = require("graphql");
const user_type_1 = require("./user.type");
const user_service_1 = __importDefault(require("../user.service"));
exports.userGQLQuery = {
    userProfile: {
        type: user_type_1.UserType,
        args: {
            userId: { type: graphql_1.GraphQLString }
        },
        resolve: async (_, args, context) => {
            const targetUserId = args.userId || context.userId;
            if (!targetUserId) {
                throw new Error("Unauthorized: Please provide a userId or authenticate.");
            }
            const data = await user_service_1.default.profile(targetUserId);
            return data.user;
        }
    }
};
