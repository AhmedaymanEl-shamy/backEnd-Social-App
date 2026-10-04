import { GraphQLID, GraphQLObjectType, GraphQLString, GraphQLList } from "graphql";

export const UserType = new GraphQLObjectType({
    name: "UserType",
    fields: {
        _id: {type: GraphQLID},    
        userName: {type: GraphQLString},
        email: {type: GraphQLString},
        phoneNumber: {type: GraphQLString},
        role: {type: GraphQLString},
        provider: {type: GraphQLString},
        gender: {type: GraphQLString},
        profilePic: {type: GraphQLString},
    }
});
