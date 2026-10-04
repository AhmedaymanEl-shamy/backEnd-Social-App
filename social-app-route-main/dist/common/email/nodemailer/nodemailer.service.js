"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeMailerProvider = void 0;
const nodeMailer_1 = __importDefault(require("nodeMailer"));
class NodeMailerProvider {
    transporter;
    constructor(config) {
        this.transporter = nodeMailer_1.default.createTransport({
            service: config.service,
            host: config.host,
            port: config.port,
            auth: {
                user: config.auth.user,
                pass: config.auth.pass, // better to be in env
            }
        });
    }
    async send(to, subject, html) {
        await this.transporter.sendMail({ to, subject, html });
    }
}
exports.NodeMailerProvider = NodeMailerProvider;
