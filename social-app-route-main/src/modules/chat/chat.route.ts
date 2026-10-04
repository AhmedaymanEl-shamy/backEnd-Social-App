import { Router } from "express";
import { getChat, getConversations } from "./chat.controller";
import { isAuth } from "../../middlewares/authentication.middleware";

const router = Router();

router.get("/", isAuth, getConversations);
router.get("/:userId", isAuth, getChat);

export default router;
