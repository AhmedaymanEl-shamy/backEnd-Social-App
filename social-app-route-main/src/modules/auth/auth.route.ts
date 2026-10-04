import type {Response, Request, NextFunction} from "express";
import {Router} from "express";
import {register, resetPassword, sendOtp, verifyAccount, login, logout} from "./auth.controller";
import {isValid} from "../../middlewares";
import {resetPasswordSchema, signupSchema} from "./auth.validation";

const router = Router();

router.post("/signup", isValid(signupSchema), register)
router.post("/verify-account", verifyAccount)
router.post("/send-otp", sendOtp)
router.patch("/reset-password", isValid(resetPasswordSchema), resetPassword)
router.post("/login", login)
router.post("/logout", logout)
export default router;
