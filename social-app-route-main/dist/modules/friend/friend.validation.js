"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestIdParamSchema = exports.userIdParamSchema = void 0;
const zod_1 = require("zod");
exports.userIdParamSchema = zod_1.z.object({
    userId: zod_1.z.string().length(24, "Invalid user ID format")
});
exports.requestIdParamSchema = zod_1.z.object({
    requestId: zod_1.z.string().length(24, "Invalid request ID format")
});
