"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateComment = exports.deleteComment = exports.getAllComments = exports.getAll = exports.addReaction = exports.createComment = void 0;
const mongoose_1 = require("mongoose");
const comment_service_1 = __importDefault(require("./comment.service"));
const add_Reaction_service_1 = __importDefault(require("../../common/services/add-Reaction.service"));
const comment_repository_1 = require("../../DB/models/comment/comment.repository");
const createComment = async (req, res, next) => {
    try {
        await comment_service_1.default.create(req.body, req.params, new mongoose_1.Types.ObjectId(req.user._id));
        res.sendStatus(204);
    }
    catch (error) {
        next(error);
    }
};
exports.createComment = createComment;
const addReaction = async (req, res, next) => {
    try {
        await (0, add_Reaction_service_1.default)(req.body, new mongoose_1.Types.ObjectId(req.user._id), comment_repository_1.commentRepo);
        res.sendStatus(204);
    }
    catch (error) {
        next(error);
    }
};
exports.addReaction = addReaction;
const getAll = async (req, res, next) => {
    const comments = await comment_service_1.default.getAll(req.params);
    res.status(200).send({ success: true, message: "Comments retrieve Successfully", data: comments });
};
exports.getAll = getAll;
const getAllComments = async (req, res, next) => {
    const comments = await comment_service_1.default.getAllComments();
    res.status(200).send({ success: true, message: "Comments retrieved successfully", details: comments });
};
exports.getAllComments = getAllComments;
const deleteComment = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = (req.user._id || req.user.id);
        await comment_service_1.default.deleteComment(id, userId);
        res.status(200).send({ success: true, message: "Comment deleted successfully" });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteComment = deleteComment;
const updateComment = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = (req.user._id || req.user.id);
        await comment_service_1.default.updateComment(id, req.body, userId);
        res.status(200).send({ success: true, message: "Comment updated successfully" });
    }
    catch (error) {
        next(error);
    }
};
exports.updateComment = updateComment;
