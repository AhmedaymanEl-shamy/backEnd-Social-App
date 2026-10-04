"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const init_1 = require("../../common/cloud/s3/init");
const user_repository_1 = require("../../DB/models/user/user.repository");
const friendship_repository_1 = require("../../DB/models/friendship/friendship.repository");
class UserService {
    cloudProvider;
    userRepository;
    friendshipRepository;
    constructor(cloudProvider, userRepository, friendshipRepository) {
        this.cloudProvider = cloudProvider;
        this.userRepository = userRepository;
        this.friendshipRepository = friendshipRepository;
    }
    async uploadProfilePic(file, userId) {
        return await this.cloudProvider.uploadFile(file, `users/${userId.toString()}`);
    }
    async profile(userId) {
        const user = await this.userRepository.getOne({ _id: userId });
        const friends = await this.friendshipRepository.getAll({ $or: [{ user1: userId }, { user2: userId }] }, {}, { populate: [{ path: "user1" }, { path: "user2" }] });
        return { user, friends };
    }
}
exports.default = new UserService(init_1.s3CloudProvider, new user_repository_1.UserRepository(), new friendship_repository_1.FriendshipRepository());
