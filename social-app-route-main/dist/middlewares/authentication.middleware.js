"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const common_1 = require("../common");
const models_1 = require("../DB/models");
const redis_service_1 = require("../DB/redis.service");
const isAuth = async (req, res, next) => {
    try {
        const auth = req.headers.authorization;
        if (!auth || !auth.startsWith("Bearer ")) {
            res.status(401).json({ success: false, message: "Unauthorized: Missing or invalid token" });
            return;
        }
        const token = auth.split(" ")[1];
        if (!token) {
            res.status(401).json({ success: false, message: "Unauthorized: Invalid token format" });
            return;
        }
        const payload = (0, common_1.verifyToken)(token);
        const isBlacklisted = await (0, redis_service_1.getFromCache)(`blacklist:${token}`);
        if (isBlacklisted) {
            res.status(401).json({ success: false, message: "Unauthorized: Token revoked" });
            return;
        }
        const user = await models_1.userRepo.getOne({ _id: payload.id });
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
        req.user = user;
        next();
    }
    catch (error) {
        res.status(401).json({ success: false, message: "Unauthorized: Invalid token" });
    }
};
exports.isAuth = isAuth;
