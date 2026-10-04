"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    postId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Post", required: true },
    parentId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Comment" },
    content: { type: String, required: true },
    reactsCount: { type: Number, default: 0 },
}, { timestamps: true });
schema.pre('deleteOne', async function () {
    const commentId = this.getQuery()._id;
    if (commentId) {
        const replies = await exports.Comment.find({ parentId: commentId });
        for (const reply of replies) {
            await exports.Comment.deleteOne({ _id: reply._id });
        }
    }
});
exports.Comment = (0, mongoose_1.model)("Comment", schema);
