"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
// post is a class that represent database tables
const mongoose_1 = require("mongoose");
const common_1 = require("../../../common");
const schema = new mongoose_1.Schema({
    username: { type: String, required: true, minlength: 2, maxLength: 25 },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: false },
    role: { type: Number, enum: common_1.SYS_ROLE, default: common_1.SYS_ROLE.user },
    gender: { type: Number, enum: common_1.SYS_GENDER, default: common_1.SYS_GENDER.male },
    profilePicture: { type: String, required: false },
    numberOfTries: { type: Number, default: 0 },
    lockUntil: { type: Date, default: null },
    credentialsUpdatedAt: { type: Date, default: Date.now },
}, { timestamps: true });
exports.User = (0, mongoose_1.model)("User", schema);
