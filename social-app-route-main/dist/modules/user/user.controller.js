"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = exports.uploadProfilePic = void 0;
const user_service_1 = __importDefault(require("./user.service"));
const uploadProfilePic = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file provided' });
        }
        //@ts-ignore
        const userId = req.user?._id;
        if (!userId) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }
        const signedUrl = await user_service_1.default.uploadProfilePic(req.file, userId);
        res.json({
            success: true,
            message: 'Profile picture upload URL generated successfully',
            data: {
                signedUrl
            }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.uploadProfilePic = uploadProfilePic;
const getProfile = async (req, res, next) => {
    try {
        //@ts-ignore
        const userId = req.user?._id;
        if (!userId) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }
        const data = await user_service_1.default.profile(userId);
        res.json({
            success: true,
            message: 'Profile fetched successfully',
            data
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getProfile = getProfile;
