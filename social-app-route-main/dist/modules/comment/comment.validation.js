"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCommentSchema = void 0;
const zod_1 = require("zod");
exports.deleteCommentSchema = zod_1.z.object({
    id: zod_1.z.string().length(24, "Invalid ID format")
});
