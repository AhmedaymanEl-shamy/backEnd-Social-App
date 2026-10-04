"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chat_controller_1 = require("./chat.controller");
const authentication_middleware_1 = require("../../middlewares/authentication.middleware");
const router = (0, express_1.Router)();
router.get("/", authentication_middleware_1.isAuth, chat_controller_1.getConversations);
router.get("/:userId", authentication_middleware_1.isAuth, chat_controller_1.getChat);
exports.default = router;
