import { Router } from "express";
import { createMessage } from "./message.controller";
import { isAuth } from "../../middlewares/authentication.middleware";
import { isValid } from "../../middlewares";
import { sendMessageSchema } from "./message.dto";

const router = Router();

router.post("/", isAuth, isValid(sendMessageSchema), createMessage);

export default router;
