"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValid = void 0;
const common_1 = require("../common");
const isValid = (schema) => {
    return async (req, res, next) => {
        const result = await schema.safeParseAsync(req.body);
        if (result.success == false) {
            const errorDetails = result.error.issues.map((issue) => ({
                path: issue.path[0],
                message: issue.message
            }));
            throw new common_1.BadRequestException('validation error', errorDetails);
        }
        next();
    };
};
exports.isValid = isValid;
