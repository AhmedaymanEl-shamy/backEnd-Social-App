"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const enums_1 = require("../enums");
const models_1 = require("../../DB/models");
function toModel(collectionName) {
    switch (collectionName) {
        case "posts":
            return enums_1.ON_MODEL.Post;
        case "comments":
            return enums_1.ON_MODEL.Comment;
        default:
            throw new utils_1.BadRequestException("Invalid collection");
    }
}
const addReaction = async (addReactionDTO, userId, repo) => {
    const docExist = await repo.getOne({ _id: addReactionDTO.id });
    if (!docExist) {
        throw new utils_1.NotFoundException("Post not found");
    }
    const userReactionRepository = new models_1.UserReactionRepository();
    const collectionName = docExist.collection.name;
    const userReact = await userReactionRepository.getOne({
        onModel: toModel(collectionName),
        userId: userId,
        refId: addReactionDTO.id
    });
    if (!userReact) {
        await userReactionRepository.create({
            onModel: toModel(collectionName),
            refId: addReactionDTO.id, reaction: addReactionDTO.reaction, userId: userId
        });
        await repo.updateOne({ _id: addReactionDTO.id }, { $inc: { reactsCount: 1 } });
        return;
    }
    if (userReact.reaction == addReactionDTO.reaction) {
        await userReactionRepository.deleteOne({ _id: userReact._id });
        await repo.updateOne({ _id: addReactionDTO.id }, { $inc: { reactsCount: -1 } });
        return;
    }
    // if different react
    await userReactionRepository.updateOne({ _id: userReact._id }, { reaction: addReactionDTO.reaction });
    return;
};
exports.default = addReaction;
