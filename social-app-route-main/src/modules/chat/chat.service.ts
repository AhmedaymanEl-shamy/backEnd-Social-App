import { Types } from "mongoose";
import { ChatRepository } from "../../DB/models/chat/chat.repository";
import { MessageRepository } from "../../DB/models/message/message.repository";
import { NotFoundException } from "../../common";

export class ChatService {
    constructor(
       private readonly chatRepository: ChatRepository,
       private readonly messageRepository: MessageRepository
    ) {}

    async getChat(userId: string, loginUser: string) {
      const chat = await this.chatRepository.getOne({participants: {$all: [userId, loginUser]}});
      if(!chat) {
          throw new NotFoundException("Chat does not exist");
      }
      const messages = await this.getMessages(userId, loginUser, chat._id.toString());
      return {chat, messages};
    }

    private async getMessages(userId: string, loginUser: string, chatId: string) {
      return await this.messageRepository.getAll({
        $or: [{sender: userId}, {sender: loginUser}],
        chat: chatId
      }, {}, {limit: 10, sort: {createdAt: -1}});
    }

    async getConversations(userId: string) {
      // Find all chats where the user is a participant
      const chats = await this.chatRepository.getAll({ participants: new Types.ObjectId(userId) });
      return chats;
    }
}

export default new ChatService(new ChatRepository(), new MessageRepository());
