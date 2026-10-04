import {Router} from "express";
import {uploadProfilePic, getProfile} from "./user.controller";
import {isAuth} from "../../middlewares/authentication.middleware";
import {multerUploadFile} from "../../common/utils";

const router = Router();
const upload = multerUploadFile();

router.post("/profile-pic", isAuth, upload.single("profilePic"), uploadProfilePic);
router.get("/", isAuth, getProfile);

export default router;
