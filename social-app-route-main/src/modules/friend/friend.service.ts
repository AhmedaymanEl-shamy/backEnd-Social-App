import { FriendRequestRepository } from "../../DB/models/friend-request/friend-request.repository";
import { FriendshipRepository } from "../../DB/models/friendship/friendship.repository";
import { BlockRepository } from "../../DB/models/block/block.repository";
import { BadRequestException, ForbiddenException, NotFoundException } from "../../common";

class FriendService {
    constructor(
        private readonly friendRequestRepo: FriendRequestRepository,
        private readonly friendshipRepo: FriendshipRepository,
        private readonly blockRepo: BlockRepository
    ) {}

    async sendRequest(senderId: string, receiverId: string) {
        if (senderId === receiverId) {
            throw new BadRequestException("You cannot send a friend request to yourself");
        }

        const block1 = await this.blockRepo.getOne({ blocker: senderId, blocked: receiverId });
        const block2 = await this.blockRepo.getOne({ blocker: receiverId, blocked: senderId });
        if (block1 || block2) {
            throw new ForbiddenException("Cannot send friend request. A block exists between you and this user.");
        }

        const friend1 = await this.friendshipRepo.getOne({ user1: senderId, user2: receiverId });
        const friend2 = await this.friendshipRepo.getOne({ user1: receiverId, user2: senderId });
        if (friend1 || friend2) {
            throw new BadRequestException("You are already friends with this user");
        }

        const req1 = await this.friendRequestRepo.getOne({ sender: senderId, receiver: receiverId });
        const req2 = await this.friendRequestRepo.getOne({ sender: receiverId, receiver: senderId });
        if (req1 || req2) {
            throw new BadRequestException("A pending friend request already exists between you two");
        }

        return await this.friendRequestRepo.create({ sender: senderId, receiver: receiverId } as any);
    }

    async acceptRequest(requestId: string, userId: string) {
        const request = await this.friendRequestRepo.getOne({ _id: requestId });
        if (!request) throw new NotFoundException("Friend request not found");

        if (request.receiver.toString() !== userId) {
            throw new ForbiddenException("You are not authorized to accept this friend request");
        }

        await this.friendshipRepo.create({ user1: request.sender, user2: request.receiver } as any);
        await this.friendRequestRepo.deleteOne({ _id: requestId });
    }

    async cancelRequest(requestId: string, userId: string) {
        const request = await this.friendRequestRepo.getOne({ _id: requestId });
        if (!request) throw new NotFoundException("Friend request not found");

        if (request.sender.toString() !== userId) {
            throw new ForbiddenException("You are not authorized to cancel this friend request");
        }

        await this.friendRequestRepo.deleteOne({ _id: requestId });
    }

    async rejectRequest(requestId: string, userId: string) {
        const request = await this.friendRequestRepo.getOne({ _id: requestId });
        if (!request) throw new NotFoundException("Friend request not found");

        if (request.receiver.toString() !== userId) {
            throw new ForbiddenException("You are not authorized to reject this friend request");
        }

        await this.friendRequestRepo.deleteOne({ _id: requestId });
    }

    async removeFriend(userId: string, targetUserId: string) {
        let friendship = await this.friendshipRepo.getOne({ user1: userId, user2: targetUserId });
        if (!friendship) {
            friendship = await this.friendshipRepo.getOne({ user1: targetUserId, user2: userId });
        }

        if (!friendship) {
            throw new NotFoundException("Friendship not found");
        }

        await this.friendshipRepo.deleteOne({ _id: friendship._id });
    }

    async blockUser(blockerId: string, blockedId: string) {
        if (blockerId === blockedId) {
            throw new BadRequestException("You cannot block yourself");
        }

        const friend1 = await this.friendshipRepo.getOne({ user1: blockerId, user2: blockedId });
        if (friend1) await this.friendshipRepo.deleteOne({ _id: friend1._id });
        const friend2 = await this.friendshipRepo.getOne({ user1: blockedId, user2: blockerId });
        if (friend2) await this.friendshipRepo.deleteOne({ _id: friend2._id });

        const req1 = await this.friendRequestRepo.getOne({ sender: blockerId, receiver: blockedId });
        if (req1) await this.friendRequestRepo.deleteOne({ _id: req1._id });
        const req2 = await this.friendRequestRepo.getOne({ sender: blockedId, receiver: blockerId });
        if (req2) await this.friendRequestRepo.deleteOne({ _id: req2._id });

        return await this.blockRepo.create({ blocker: blockerId, blocked: blockedId } as any);
    }

    async unblockUser(blockerId: string, blockedId: string) {
        const block = await this.blockRepo.getOne({ blocker: blockerId, blocked: blockedId });
        if (!block) {
            throw new NotFoundException("Block record not found");
        }

        await this.blockRepo.deleteOne({ _id: block._id });
    }
}

export default new FriendService(
    new FriendRequestRepository(),
    new FriendshipRepository(),
    new BlockRepository()
);
