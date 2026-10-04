"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageService = void 0;
const mongoose_1 = require("mongoose");
const chat_repository_1 = require("../../DB/models/chat/chat.repository");
const message_repository_1 = require("../../DB/models/message/message.repository");
const chat_type_1 = require("../../common/types/chat.type");
class MessageService {
    chatRepository;
    messageRepository;
    constructor(chatRepository, messageRepository) {
        this.chatRepository = chatRepository;
        this.messageRepository = messageRepository;
    }
    async createMessage(data, userId) {
        let chat = await this.chatRepository.getOne({
            participants: { $all: [data.sendTo, userId] },
            chatType: chat_type_1.ChatType.private
        });
        let createdChat;
        if (!chat) {
            createdChat = await this.chatRepository.create({
                participants: [new mongoose_1.Types.ObjectId(data.sendTo), new mongoose_1.Types.ObjectId(userId)],
                chatType: chat_type_1.ChatType.private
            });
        }
        await this.messageRepository.create({
            sender: new mongoose_1.Types.ObjectId(userId),
            content: data.content,
            chat: chat ? chat._id : createdChat?._id
        });
    }
}
exports.MessageService = MessageService;
exports.default = new MessageService(new chat_repository_1.ChatRepository(), new message_repository_1.MessageRepository());
