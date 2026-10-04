import { model, Schema } from "mongoose";
import { IComment } from "../../../common";


const schema = new Schema<IComment>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    parentId: { type: Schema.Types.ObjectId, ref: "Comment" },
    content: { type: String, required: true },
    reactsCount: { type: Number, default: 0 },
}, { timestamps: true });

schema.pre('deleteOne', async function () {
    const commentId = this.getQuery()._id;
    if (commentId) {
        const replies = await Comment.find({ parentId: commentId });
        for (const reply of replies) {
            await Comment.deleteOne({ _id: reply._id });
        }
    }
});

export const Comment = model("Comment", schema);
