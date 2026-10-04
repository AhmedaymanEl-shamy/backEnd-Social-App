import {z} from "zod";
import {IUser} from "../../common";
import {SignupDTO} from "./auth.dto";

export const signupSchema = z.object({
    username: z.string({message: "Username is required"}).min(2).max(25),
    email: z.email({message: "Please enter a valid email address"}),
    password: z.string().regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        {
            message:
                "New Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character",
        }
    ),
    phoneNumber: z.string({message: "Please enter a valid phone number starting with '+' followed by your country code and digits"}).regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)
});

export const resetPasswordSchema = z.object({
    email: z.email({message: "Please enter a valid email address"}),
    otp: z
        .string()
        .length(6, {message: "OTP must be 6 digits"})
        .regex(/^\d+$/, {
            message: "OTP must contain only numbers",
        }),
    newPassword: z.string().regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        {
            message:
                "New Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character",
        }
    ),

});


export const loginSchema = {}
export const forgetPasswordSchema = {}