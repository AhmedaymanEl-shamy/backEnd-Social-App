"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const comment_repository_1 = require("../../DB/models/comment/comment.repository");
const models_1 = require("../../DB/models");
const common_1 = require("../../common");
class CommentService {
    postRepository;
    commentRepo;
    constructor(postRepository, commentRepo) {
        this.postRepository = postRepository;
        this.commentRepo = commentRepo;
    }
    async create(createCommentDTO, params, userId) {
        // postID check exist
        const postExist = await this.postRepository.getOne({ _id: params.postId });
        if (!postExist) {
            throw new common_1.NotFoundException("Post not found");
        }
        // if parentId -> reply
        if (params.parentId) {
            const parentCommentExist = await this.commentRepo.getOne({ _id: params.parentId });
            if (!parentCommentExist)
                throw new common_1.NotFoundException("Parent comment exist");
        }
        // increase comments count
        await this.postRepository.updateOne({ _id: params.postId }, { $inc: { commentsCount: 1 } });
        return await this.commentRepo.create({
            ...createCommentDTO,
            ...params,
            userId
        });
    }
    async getAll(params) {
        // params {postId,parentId}
        const comments = await this.commentRepo.getAll({ postId: params.postId, parentId: params.parentId });
        if (comments.length === 0) {
            throw new common_1.NotFoundException("No comments found.");
        }
        return comments;
    }
    async getAllComments() {
        const comments = await this.commentRepo.getAll({});
        if (comments.length === 0) {
            throw new common_1.NotFoundException("No comments found.");
        }
        return comments;
    }
    async deleteComment(commentId, userId) {
        const comment = await this.commentRepo.getOne({ _id: commentId });
        if (!comment) {
            throw new common_1.NotFoundException("Comment not found");
        }
        const post = await this.postRepository.getOne({ _id: comment.postId });
        if (!post) {
            throw new common_1.NotFoundException("Post not found");
        }
        if (comment.userId.toString() !== userId && post.userId.toString() !== userId) {
            throw new common_1.ForbiddenException("You do not have permission to delete this comment");
        }
        await this.commentRepo.deleteOne({ _id: commentId });
        await this.postRepository.updateOne({ _id: comment.postId }, { $inc: { commentsCount: -1 } });
    }
    async updateComment(commentId, updateData, userId) {
        const comment = await this.commentRepo.getOne({ _id: commentId });
        if (!comment) {
            throw new common_1.NotFoundException("Comment not found");
        }
        if (comment.userId.toString() !== userId) {
            throw new common_1.ForbiddenException("You do not have permission to update this comment");
        }
        await this.commentRepo.updateOne({ _id: commentId }, { content: updateData.content });
    }
}
exports.default = new CommentService(new models_1.PostRepository(), new comment_repository_1.CommentRepository());
