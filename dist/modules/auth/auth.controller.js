"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.resetPassword = exports.sendOtp = exports.verifyAccount = exports.register = void 0;
const auth_service_1 = __importDefault(require("./auth.service"));
const register = async (req, res, next) => {
    try {
        console.log("in the controller phase"); // handle service code
        const result = await auth_service_1.default.signup(req.body);
        // send response
        return res.status(201).json({ message: "User created successfully.", success: true });
    }
    catch (error) {
        next(error);
    }
};
exports.register = register;
const verifyAccount = async (req, res, next) => {
    await auth_service_1.default.verifyAccount(req.body);
    return res.status(200).json({ message: "User verified successfully.", success: true });
};
exports.verifyAccount = verifyAccount;
const sendOtp = async (req, res, next) => {
    await auth_service_1.default.sendOTP(req.body);
    return res.status(200).json({ message: "send OTP successfully.", success: true });
};
exports.sendOtp = sendOtp;
const resetPassword = async (req, res, next) => {
    await auth_service_1.default.resetPassword(req.body);
    return res.status(200).json({ message: "Password reset successfully", success: true });
};
exports.resetPassword = resetPassword;
const login = async (req, res, next) => {
    try {
        const result = await auth_service_1.default.login(req.body);
        return res.status(200).json({ message: "Login successful", success: true, data: result });
    }
    catch (error) {
        next(error);
    }
};
exports.login = login;
const logout = async (req, res, next) => {
    try {
        const auth = req.headers.authorization;
        const token = auth ? auth.split(" ")[1] : "";
        const result = await auth_service_1.default.logout(token || "");
        return res.status(200).json({ message: result.message, success: true });
    }
    catch (error) {
        next(error);
    }
};
exports.logout = logout;
