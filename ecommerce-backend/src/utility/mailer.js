import nodemailer from 'nodemailer';
import CONFIG from '../config/mail.config.js';

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
