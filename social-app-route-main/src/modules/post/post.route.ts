import {Router} from "express";
import {createPost, reaction, getSinglePost, deletePost, getProfilePosts, getNewsFeed} from "./post.controller";
import {isValid, isAuth} from "../../middlewares";
import {createPostSchema} from "./post.dto";


const router = Router();

router.post("/", isAuth, isValid(createPostSchema), createPost);
router.post("/reaction", isAuth, reaction);
router.get("/feed/dashboard", isAuth, getNewsFeed);
router.get("/user/:userId/posts", isAuth, getProfilePosts);
router.get("/:id", isAuth, getSinglePost);
router.delete("/:id", isAuth, deletePost);

export default router;
