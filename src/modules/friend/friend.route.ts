import { Router } from "express";
import {
    acceptRequest,
    blockUser,
    cancelRequest,
    rejectRequest,
    removeFriend,
    sendRequest,
    unblockUser
} from "./friend.controller";
import { isAuth, isValid } from "../../middlewares";
import { requestIdParamSchema, userIdParamSchema } from "./friend.validation";

const router = Router();

router.post("/friends/request/:userId", isAuth, isValid(userIdParamSchema), sendRequest);
router.post("/friends/accept/:requestId", isAuth, isValid(requestIdParamSchema), acceptRequest);
router.delete("/friends/request/:requestId", isAuth, isValid(requestIdParamSchema), cancelRequest);
router.delete("/friends/request/:requestId/reject", isAuth, isValid(requestIdParamSchema), rejectRequest);
router.delete("/friends/:userId", isAuth, isValid(userIdParamSchema), removeFriend);


router.post("/blocks/:userId", isAuth, isValid(userIdParamSchema), blockUser);
router.delete("/blocks/:userId", isAuth, isValid(userIdParamSchema), unblockUser);

export default router;
