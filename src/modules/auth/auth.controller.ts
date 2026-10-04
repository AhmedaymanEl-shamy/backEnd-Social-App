import type {NextFunction, Response, Request} from "express";
import authService from "./auth.service";

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("in the controller phase");        // handle service code
        const result = await authService.signup(req.body);

        // send response
        return res.status(201).json({message: "User created successfully.", success: true});
    } catch (error) {
        next(error);
    }
}


export const verifyAccount = async (req: Request, res: Response, next: NextFunction) => {
    await authService.verifyAccount(req.body);
    return res.status(200).json({message: "User verified successfully.", success: true});

}

export const sendOtp = async (req: Request, res: Response, next: NextFunction) => {
    await authService.sendOTP(req.body);
    return res.status(200).json({message: "send OTP successfully.", success: true});

}

export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    await authService.resetPassword(req.body);
    return res.status(200).json({message: "Password reset successfully", success: true});

}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await authService.login(req.body);
        return res.status(200).json({message: "Login successful", success: true, data: result});
    } catch (error) {
        next(error);
    }
}

export const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const auth = req.headers.authorization;
        const token = (auth as string | undefined) ? (auth as string).split(" ")[1] : "";
        const result = await authService.logout(token || "");
        return res.status(200).json({message: result.message, success: true});
    } catch (error) {
        next(error);
    }
}