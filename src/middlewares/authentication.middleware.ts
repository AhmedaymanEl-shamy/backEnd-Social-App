import type { NextFunction, Request, Response } from "express";
import { IUser } from "../common/interfaces/user.interface";
import { verifyToken } from "../common";
import { userRepo } from "../DB/models";
import { getFromCache } from "../DB/redis.service";

export const isAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const auth = req.headers.authorization;
        if (!auth || !auth.startsWith("Bearer ")) {
            res.status(401).json({ success: false, message: "Unauthorized: Missing or invalid token" });
            return;
        }

        const token = (auth as string).split(" ")[1];
        if (!token) {
            res.status(401).json({ success: false, message: "Unauthorized: Invalid token format" });
            return;
        }
        const payload = verifyToken(token) as { id: string, role: number, iat: number };
        
        const isBlacklisted = await getFromCache(`blacklist:${token}`);
        if (isBlacklisted) {
            res.status(401).json({ success: false, message: "Unauthorized: Token revoked" });
            return;
        }
        
        const user = await userRepo.getOne({ _id: payload.id });
        if (!user) {
            res.status(401).json({ success: false, message: "Unauthorized: User not found" });
            return;
        }

        if (user.credentialsUpdatedAt && payload.iat) {
            if (new Date(user.credentialsUpdatedAt).getTime() > payload.iat * 1000) {
                res.status(401).json({ success: false, message: "Unauthorized: Token expired due to password change" });
                return;
            }
        }

        req.user = user as any;
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: "Unauthorized: Invalid token" });
    }
};