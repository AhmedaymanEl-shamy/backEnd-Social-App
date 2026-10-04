"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.friendshipRepo = exports.FriendshipRepository = void 0;
const abstract_repository_1 = require("../../abstract.repository");
const friendship_model_1 = require("./friendship.model");
class FriendshipRepository extends abstract_repository_1.AbstractRepository {
    constructor() {
        super(friendship_model_1.Friendship);
    }
}
exports.FriendshipRepository = FriendshipRepository;
exports.friendshipRepo = new FriendshipRepository();
