"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConversations = exports.getChat = void 0;
const chat_service_1 = __importDefault(require("./chat.service"));
const getChat = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        // @ts-ignore
        const loginUser = (req.user?._id || req.user?.id);
        const { chat, messages } = await chat_service_1.default.getChat(userId, loginUser);
        return res.status(200).json({ success: true, message: "Chat retrieved successfully", data: { chat, messages } });
    }
    catch (error) {
        next(error);
    }
};
exports.getChat = getChat;
const getConversations = async (req, res, next) => {
    try {
        // @ts-ignore
        const userId = (req.user?._id || req.user?.id);
        const chats = await chat_service_1.default.getConversations(userId);
        return res.status(200).json({ success: true, message: "Conversations retrieved successfully", data: chats });
    }
    catch (error) {
        next(error);
    }
};
exports.getConversations = getConversations;
