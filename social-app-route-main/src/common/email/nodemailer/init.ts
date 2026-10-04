import {NodeMailerProvider} from "./nodemailer.service";
import {MAIL_PASS, MAIL_USER} from "../../../config";

export const nodeMailerProvider = new NodeMailerProvider({
    service: "gmail",
    host: "stmp.gamil.com",
    port: 587,
    auth: {
        user: MAIL_USER,
        pass: MAIL_PASS,
    }
})