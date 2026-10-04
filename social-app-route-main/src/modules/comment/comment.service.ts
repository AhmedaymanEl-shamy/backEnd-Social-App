import {CreateCommentDTO} from "./comment.dto";
import {Types} from "mongoose";
import {CommentRepository} from "../../DB/models/comment/comment.repository";
import {PostRepository} from "../../DB/models";
import {NotFoundException, ForbiddenException} from "../../common";
import {AddReactionDTO} from "../post/post.dto";

class CommentService {
    constructor(private readonly postRepository: PostRepository, private readonly commentRepo: CommentRepository) {
    }

    async create(createCommentDTO: CreateCommentDTO, params: any, userId: Types.ObjectId) {
        // postID check exist
        const postExist = await this.postRepository.getOne({_id: params.postId});
        if (!postExist) {
            throw new NotFoundException("Post not found");
        }
        // if parentId -> reply
        if (params.parentId) {
            const parentCommentExist = await this.commentRepo.getOne({_id: params.parentId});
            if (!parentCommentExist) throw new NotFoundException("Parent comment exist");
        }
        // increase comments count
        await this.postRepository.updateOne({_id: params.postId}, {$inc: {commentsCount: 1}})
        return await this.commentRepo.create({
            ...createCommentDTO,
            ...params,
            userId
        })

    }

    async getAll(params: any) {
        // params {postId,parentId}
        const comments = await this.commentRepo.getAll({postId: params.postId, parentId: params.parentId})
        if (comments.length === 0) {
            throw new NotFoundException("No comments found.");
        }
        return comments;
    }

    async getAllComments() {
        const comments = await this.commentRepo.getAll({});
        if (comments.length === 0) {
            throw new NotFoundException("No comments found.");
        }
        return comments;
    }

    async deleteComment(commentId: string, userId: string) {
        const comment = await this.commentRepo.getOne({ _id: commentId });
        if (!comment) {
            throw new NotFoundException("Comment not found");
        }

        const post = await this.postRepository.getOne({ _id: comment.postId });
        if (!post) {
            throw new NotFoundException("Post not found");
        }

        if (comment.userId.toString() !== userId && post.userId.toString() !== userId) {
            throw new ForbiddenException("You do not have permission to delete this comment");
        }

        await this.commentRepo.deleteOne({ _id: commentId });
        await this.postRepository.updateOne({ _id: comment.postId }, { $inc: { commentsCount: -1 } });
    }

    async updateComment(commentId: string, updateData: any, userId: string) {
        const comment = await this.commentRepo.getOne({ _id: commentId });
        if (!comment) {
            throw new NotFoundException("Comment not found");
        }

        if (comment.userId.toString() !== userId) {
            throw new ForbiddenException("You do not have permission to update this comment");
        }

        await this.commentRepo.updateOne({ _id: commentId }, { content: updateData.content });
    }
}

export default new CommentService(new PostRepository(), new CommentRepository());