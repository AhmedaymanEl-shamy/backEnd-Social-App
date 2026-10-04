"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodeMailerProvider = void 0;
const nodemailer_service_1 = require("./nodemailer.service");
const config_1 = require("../../../config");
exports.nodeMailerProvider = new nodemailer_service_1.NodeMailerProvider({
    service: "gmail",
    host: "stmp.gamil.com",
    port: 587,
    auth: {
        user: config_1.MAIL_USER,
        pass: config_1.MAIL_PASS,
    }
});
