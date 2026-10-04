"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const nodeMailer_1 = __importDefault(require("nodeMailer"));
const config_1 = require("../../config");
/**
 *
 * @param  {}
 * @param {}.to the email to send
 * @param {}.subject the subject of email
 * @param {}.html the body of email
 */
const sendMail = async ({ to, subject, html }) => {
    const transporter = nodeMailer_1.default.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 443,
        auth: {
            user: config_1.MAIL_USER,
            pass: config_1.MAIL_PASS, // better to be in env
        }
    });
    await transporter.sendMail({
        from: `"Social Media App" ${config_1.MAIL_USER}`,
        to: to,
        subject: subject,
        html: html
    });
};
exports.sendMail = sendMail;
