import nodemailer from 'nodemailer';
import CONFIG from '../config/mail.config.js';
import hbs from 'nodemailer-express-handlebars'
import path from 'path';
// const path = require('path')


export const sendEmail = (toAddress, subject, text, html, attachments, userName, authPassword, cc) => {
    const transporter = nodemailer.createTransport({
        host: CONFIG.HOST,
        port: CONFIG.PORT,
        auth: {
            user: userName,
            pass: authPassword
        },
        secure: true
    });

    transporter
        .sendMail({
            from: `Inani Hub <${userName}>`, // sender address
            to: toAddress, // list of receivers
            subject, // Subject line
            text, // plain text body
            html, // html body,
            attachments,
            cc
        })
        .then((info) => {
            console.log({ info });
        })
        .catch(console.error);
};



export const adminEmail = (toAddress, subject, text, html, userName, authPassword, receiverName, companyName, cc, bcc) => {
    const transporter = nodemailer.createTransport({
        host: CONFIG.HOST,
        port: CONFIG.PORT,
        auth: {
            user: userName,
            pass: authPassword
        },
        secure: true
    });

    transporter.use('compile', hbs({
        viewEngine: {
            partialsDir: path.resolve('./src/views/'),
            defaultLayout: false,
        },
        viewPath: path.resolve('./src/views/')
    }))

    transporter
        .sendMail({
            from: `Inani Hub <${userName}>`, // sender address
            to: toAddress, // list of receivers
            subject, // Subject line
            text, // plain text body
            template: 'index', // html body,
            context: {
                name: `${receiverName}`, // replace {{name}} with Adebola
                company: `${companyName}` // replace {{company}} with My Company
            },
            attachments: [
                {
                    filename: '404.jpg',
                    path: './src/utility/mail/404.jpg'
                }
            ],
            cc,
            bcc
        })
        .then((info) => {
            console.log({ info });
        })
        .catch(console.error);
};
