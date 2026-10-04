"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgetPasswordSchema = exports.loginSchema = exports.resetPasswordSchema = exports.signupSchema = void 0;
const zod_1 = require("zod");
exports.signupSchema = zod_1.z.object({
    username: zod_1.z.string({ message: "Username is required" }).min(2).max(25),
    email: zod_1.z.email({ message: "Please enter a valid email address" }),
    password: zod_1.z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
        message: "New Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character",
    }),
    phoneNumber: zod_1.z.string({ message: "Please enter a valid phone number starting with '+' followed by your country code and digits" }).regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)
});
exports.resetPasswordSchema = zod_1.z.object({
    email: zod_1.z.email({ message: "Please enter a valid email address" }),
    otp: zod_1.z
        .string()
        .length(6, { message: "OTP must be 6 digits" })
        .regex(/^\d+$/, {
        message: "OTP must contain only numbers",
    }),
    newPassword: zod_1.z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
        message: "New Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character",
    }),
});
exports.loginSchema = {};
exports.forgetPasswordSchema = {};
