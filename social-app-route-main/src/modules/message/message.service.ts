import { Types } from "mongoose";
import { ChatRepository } from "../../DB/models/chat/chat.repository";
import { MessageRepository } from "../../DB/models/message/message.repository";
import type { SendMessageDTO } from "./message.dto";
import { ChatType } from "../../common/types/chat.type";

export class MessageService {
    constructor(
        private readonly chatRepository: ChatRepository,
        private readonly messageRepository: MessageRepository
    ) { }

    async createMessage(data: SendMessageDTO, userId: string) {
        let chat = await this.chatRepository.getOne({
            participants: { $all: [data.sendTo, userId] },
            chatType: ChatType.private
        });

        let createdChat;
        if (!chat) {
            createdChat = await this.chatRepository.create({
                participants: [new Types.ObjectId(data.sendTo), new Types.ObjectId(userId)],
                chatType: ChatType.private
            } as any);
        }

        await this.messageRepository.create({
            sender: new Types.ObjectId(userId),
            content: data.content,
            chat: chat ? chat._id : createdChat?._id
        } as any);
    }
}

export default new MessageService(new ChatRepository(), new MessageRepository());
