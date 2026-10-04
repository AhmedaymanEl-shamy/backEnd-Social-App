import nodeMailer from "nodeMailer"
import {MAIL_PASS, MAIL_USER} from "../../config";
import { MailOptions } from "nodeMailer/lib/json-transport";

/**
 *
 * @param  {}
 * @param {}.to the email to send
 * @param {}.subject the subject of email
 * @param {}.html the body of email
 */
export const sendMail = async ({to, subject, html}: MailOptions) => {
    const transporter = nodeMailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 443,
        auth: {
            user: MAIL_USER,
            pass: MAIL_PASS, // better to be in env
        }
    })
    await transporter.sendMail({
        from: `"Social Media App" ${MAIL_USER}`,
        to: to,
        subject: subject,
        html: html
    })

}