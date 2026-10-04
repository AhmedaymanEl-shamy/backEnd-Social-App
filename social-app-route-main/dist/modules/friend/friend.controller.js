"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unblockUser = exports.blockUser = exports.removeFriend = exports.rejectRequest = exports.cancelRequest = exports.acceptRequest = exports.sendRequest = void 0;
const friend_service_1 = __importDefault(require("./friend.service"));
const sendRequest = async (req, res, next) => {
    const userId = req.params.userId;
    const senderId = (req.user._id || req.user.id);
    await friend_service_1.default.sendRequest(senderId, userId);
    res.status(201).json({ success: true, message: "Friend request sent successfully" });
};
exports.sendRequest = sendRequest;
const acceptRequest = async (req, res, next) => {
    const requestId = req.params.requestId;
    const userId = (req.user._id || req.user.id);
    await friend_service_1.default.acceptRequest(requestId, userId);
    res.status(200).json({ success: true, message: "Friend request accepted successfully" });
};
exports.acceptRequest = acceptRequest;
const cancelRequest = async (req, res, next) => {
    const requestId = req.params.requestId;
    const userId = (req.user._id || req.user.id);
    await friend_service_1.default.cancelRequest(requestId, userId);
    res.status(200).json({ success: true, message: "Friend request cancelled successfully" });
};
exports.cancelRequest = cancelRequest;
const rejectRequest = async (req, res, next) => {
    const requestId = req.params.requestId;
    const userId = (req.user._id || req.user.id);
    await friend_service_1.default.rejectRequest(requestId, userId);
    res.status(200).json({ success: true, message: "Friend request rejected successfully" });
};
exports.rejectRequest = rejectRequest;
const removeFriend = async (req, res, next) => {
    const targetUserId = req.params.userId;
    const userId = (req.user._id || req.user.id);
    await friend_service_1.default.removeFriend(userId, targetUserId);
    res.status(200).json({ success: true, message: "Friend removed successfully" });
};
exports.removeFriend = removeFriend;
const blockUser = async (req, res, next) => {
    const blockedId = req.params.userId;
    const blockerId = (req.user._id || req.user.id);
    await friend_service_1.default.blockUser(blockerId, blockedId);
    res.status(200).json({ success: true, message: "User blocked successfully" });
};
exports.blockUser = blockUser;
const unblockUser = async (req, res, next) => {
    const blockedId = req.params.userId;
    const blockerId = (req.user._id || req.user.id);
    await friend_service_1.default.unblockUser(blockerId, blockedId);
    res.status(200).json({ success: true, message: "User unblocked successfully" });
};
exports.unblockUser = unblockUser;
