"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPostSchema = void 0;
const zod_1 = require("zod");
const common_1 = require("../../common");
exports.createPostSchema = zod_1.z.object({
    content: zod_1.z.string().optional(),
    attachments: zod_1.z.array(zod_1.z.string()).optional(),
}).refine((data) => {
    const { content, attachments } = data;
    if (!content && (!attachments || attachments.length === 0)) {
        throw new common_1.BadRequestException("Content or attachments must be provided");
    }
    return true;
});
