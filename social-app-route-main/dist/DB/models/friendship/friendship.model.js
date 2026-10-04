"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Friendship = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    user1: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    user2: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });
exports.Friendship = (0, mongoose_1.model)("Friendship", schema);
