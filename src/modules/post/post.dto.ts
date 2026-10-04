import {z} from "zod";
import {BadRequestException, SYS_REACTION} from "../../common";
import {Types} from "mongoose";

export interface CreatePostDTO {
    // userId will be excute from headers
    content?: string;
    attachments?: string[];

}


export interface AddReactionDTO {
    postId: Types.ObjectId;
    reaction: SYS_REACTION
}


export const createPostSchema = z.object({
    content: z.string().optional(),
    attachments: z.array(z.string()).optional(),
}).refine((data) => {
    const {content, attachments} = data;
    if (!content && (!attachments || attachments.length === 0)) {
        throw new BadRequestException("Content or attachments must be provided");
    }
    return true;
})