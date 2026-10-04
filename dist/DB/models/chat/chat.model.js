"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chat = void 0;
const mongoose_1 = require("mongoose");
const chat_type_1 = require("../../../common/types/chat.type");
const modelSchema = new mongoose_1.Schema({
    participants: { type: [mongoose_1.Schema.Types.ObjectId], ref: "User", required: true },
    chatType: { type: String, enum: chat_type_1.ChatType, default: chat_type_1.ChatType.private },
    admin: { type: [mongoose_1.Schema.Types.ObjectId], ref: "User", required: function () {
            return this.chatType == chat_type_1.ChatType.group;
        } }
}, { timestamps: true });
exports.Chat = (0, mongoose_1.model)("Chat", modelSchema);
