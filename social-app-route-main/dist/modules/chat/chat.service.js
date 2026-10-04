"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const mongoose_1 = require("mongoose");
const chat_repository_1 = require("../../DB/models/chat/chat.repository");
const message_repository_1 = require("../../DB/models/message/message.repository");
const common_1 = require("../../common");
class ChatService {
    chatRepository;
    messageRepository;
    constructor(chatRepository, messageRepository) {
        this.chatRepository = chatRepository;
        this.messageRepository = messageRepository;
    }
    async getChat(userId, loginUser) {
        const chat = await this.chatRepository.getOne({ participants: { $all: [userId, loginUser] } });
        if (!chat) {
            throw new common_1.NotFoundException("Chat does not exist");
        }
        const messages = await this.getMessages(userId, loginUser, chat._id.toString());
        return { chat, messages };
    }
    async getMessages(userId, loginUser, chatId) {
        return await this.messageRepository.getAll({
            $or: [{ sender: userId }, { sender: loginUser }],
            chat: chatId
        }, {}, { limit: 10, sort: { createdAt: -1 } });
    }
    async getConversations(userId) {
        // Find all chats where the user is a participant
        const chats = await this.chatRepository.getAll({ participants: new mongoose_1.Types.ObjectId(userId) });
        return chats;
    }
}
exports.ChatService = ChatService;
exports.default = new ChatService(new chat_repository_1.ChatRepository(), new message_repository_1.MessageRepository());
