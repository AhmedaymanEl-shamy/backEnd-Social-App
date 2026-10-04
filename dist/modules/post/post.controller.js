"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNewsFeed = exports.getProfilePosts = exports.deletePost = exports.getSinglePost = exports.reaction = exports.createPost = void 0;
const post_service_1 = __importDefault(require("./post.service"));
const mongoose_1 = require("mongoose");
const createPost = async (req, res, next) => {
    try {
        const createdPost = await post_service_1.default.create(req.body, new mongoose_1.Types.ObjectId(req.user._id));
        // send response
        return res.status(201).json({ message: "Post created successfully.", success: true, data: { createdPost } });
    }
    catch (error) {
        next(error);
    }
};
exports.createPost = createPost;
const reaction = async (req, res, next) => {
    try {
        await post_service_1.default.addReaction(req.body, new mongoose_1.Types.ObjectId(req.user._id));
        return res.sendStatus(204);
    }
    catch (error) {
        next(error);
    }
};
exports.reaction = reaction;
const getSinglePost = async (req, res, next) => {
    try {
        const post = await post_service_1.default.getSinglePost(req.params.id);
        return res.status(200).json({ success: true, data: post });
    }
    catch (error) {
        next(error);
    }
};
exports.getSinglePost = getSinglePost;
const deletePost = async (req, res, next) => {
    try {
        const result = await post_service_1.default.deletePost(req.params.id, req.user._id.toString());
        return res.status(200).json({ success: true, message: result.message });
    }
    catch (error) {
        next(error);
    }
};
exports.deletePost = deletePost;
const getProfilePosts = async (req, res, next) => {
    try {
        const posts = await post_service_1.default.getProfilePosts(req.params.userId);
        return res.status(200).json({ success: true, data: posts });
    }
    catch (error) {
        next(error);
    }
};
exports.getProfilePosts = getProfilePosts;
const getNewsFeed = async (req, res, next) => {
    try {
        const feed = await post_service_1.default.getNewsFeed(req.user._id.toString());
        return res.status(200).json({ success: true, data: feed });
    }
    catch (error) {
        next(error);
    }
};
exports.getNewsFeed = getNewsFeed;
