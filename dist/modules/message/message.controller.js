"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMessage = void 0;
const message_service_1 = __importDefault(require("./message.service"));
const createMessage = async (req, res, next) => {
    try {
        // @ts-ignore
        const userId = (req.user?._id || req.user?.id);
        await message_service_1.default.createMessage(req.body, userId);
        return res.status(201).json({ success: true, message: "Message sent successfully" });
    }
    catch (error) {
        next(error);
    }
};
exports.createMessage = createMessage;
