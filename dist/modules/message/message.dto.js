"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessageSchema = void 0;
const zod_1 = require("zod");
exports.sendMessageSchema = zod_1.z.object({
    body: zod_1.z.object({
        sendTo: zod_1.z.string().min(24).max(24),
        content: zod_1.z.string().min(1)
    })
});
