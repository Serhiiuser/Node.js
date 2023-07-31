import nodemailer, {Transporter} from "nodemailer";
import path from "node:path";

import EmailTemplates from "email-templates"
import {allTemplates} from "../constants";
import {EEmailActions} from "../enums";
import {configs} from "../configs";


class EmailService {
    private transporter: Transporter;
    private templateParser;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "kobryns91@gmail.com",
                pass: "ytscckajznnzvnul",
            },
        });
        this.templateParser = new EmailTemplates({
            views: {
                root: path.join(process.cwd(), "src", "statics"),
                options: {
                    extension: "hbs",
                },
            },
            juice: true,
            juiceResources: {
                webResources: {
                    relativeTo: path.join(process.cwd(), "src", "statics", "css"),
                },
            },
        });
    }


    public async sendMail(email: string, emailActions: EEmailActions, locals: Record<string, string> = {}
    ) {
        try {

            const templateInfo = allTemplates[emailActions];
            // @ts-ignore
            locals.fromtUrl = configs.FRONT_URL

            const html = await this.templateParser.render(templateInfo.templateName, locals)
            return this.transporter.sendMail({
                from: "No reply",
                to: email,
                subject: templateInfo.subject,
                html

            });

        } catch (e: any) {
            console.error(e.message)
        }
    }

}

export const emailService = new EmailService();