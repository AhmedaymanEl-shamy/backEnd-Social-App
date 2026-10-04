import { Router } from "express";
import { getNotifications, getSingleNotification, markAsRead, deleteNotification } from "./notification.controller";
import { isAuth } from "../../middlewares";

const router = Router();

router.get("/", isAuth, getNotifications);
router.get("/:id", isAuth, getSingleNotification);
router.patch("/:id/read", isAuth, markAsRead);
router.delete("/:id", isAuth, deleteNotification);

export default router;
