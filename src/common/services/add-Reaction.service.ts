import { Types } from "mongoose";

import { BadRequestException, NotFoundException } from "../utils";
import { ON_MODEL } from "../enums";
import { AddReactionDTO } from "../dto";
import { PostRepository, UserReactionRepository } from "../../DB/models";
import { CommentRepository } from "../../DB/models/comment/comment.repository";

function toModel(collectionName: string) {
    switch (collectionName) {
        case "posts":
            return ON_MODEL.Post;
        case "comments":
            return ON_MODEL.Comment;

        default:
            throw new BadRequestException("Invalid collection")
    }
}


const addReaction = async (addReactionDTO: AddReactionDTO, userId: Types.ObjectId, repo: PostRepository | CommentRepository) => {
    const docExist = await repo.getOne({ _id: addReactionDTO.id })
    if (!docExist) {
        throw new NotFoundException("Post not found");
    }
    const userReactionRepository = new UserReactionRepository();
    const collectionName = docExist.collection.name
    const userReact = await userReactionRepository.getOne({
        onModel: toModel(collectionName),
        userId: userId,
        refId: addReactionDTO.id
    })
    if (!userReact) {
        await userReactionRepository.create({
            onModel: toModel(collectionName),
            refId: addReactionDTO.id, reaction: addReactionDTO.reaction, userId: userId
        })
        await repo.updateOne({ _id: addReactionDTO.id }, { $inc: { reactsCount: 1 } })
        return;
    }
    if (userReact.reaction == addReactionDTO.reaction) {
        await userReactionRepository.deleteOne({ _id: userReact._id })
        await repo.updateOne({ _id: addReactionDTO.id }, { $inc: { reactsCount: -1 } })
        return;

    }
    // if different react
    await userReactionRepository.updateOne({ _id: userReact._id }, { reaction: addReactionDTO.reaction })
    return

}
export default addReaction