import nodemailer, { Transporter } from "nodemailer";
import  path from "node:path";

import EmailTemplates from "email-templates"
import {allTemplates} from "../constants";
import {EEmailActions} from "../enums";


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


    public async sendMail(email: string,emailActions: EEmailActions) {

        const templateInfo = allTemplates[emailActions]
        console.log(templateInfo);

        const html =await this.templateParser.render(templateInfo.templateName)
        return this.transporter.sendMail({
            from: "No reply",
            to: email,
            subject:templateInfo.subject,
            html

        });
    }

}

export const emailService = new EmailService();