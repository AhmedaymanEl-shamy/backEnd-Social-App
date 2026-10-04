import {Router} from "express";
import {addReaction, createComment, getAll, getAllComments, deleteComment, updateComment} from "./comment.controller";
import {isAuth, isValid} from "../../middlewares";
import {deleteCommentSchema} from "./comment.validation";


const router = Router();

router.post("/add-reaction", isAuth, addReaction);
router.post("/:postId{/:parentId}", isAuth, createComment);
router.get("/:postId{/:parentId}", isAuth, getAll);

router.get("/", isAuth, getAllComments);
router.patch("/:id", isAuth, updateComment);
router.delete("/:id", isAuth, isValid(deleteCommentSchema), deleteComment);

export default router;
