import {IMailProvider} from '../mail.interface';
import nodemailer, {Transporter} from 'nodeMailer';

// configs

interface nodeMailerConfig {
    service: string,
    host: string,
    port: number,
    auth: {
        user: string,
        pass: string,
    }

}

export class NodeMailerProvider implements IMailProvider {
    private readonly transporter: Transporter;

    constructor(config: nodeMailerConfig) {
        this.transporter = nodemailer.createTransport({
            service: config.service,
            host: config.host,
            port: config.port,
            auth: {
                user: config.auth.user,
                pass: config.auth.pass, // better to be in env
            }
        });
    }

    async send(to: string, subject: string, html: string): Promise<void> {
        await this.transporter.sendMail({to, subject, html})
    }

}
