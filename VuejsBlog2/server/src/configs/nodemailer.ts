const nodemailer = require('nodemailer')
import mailresetpass from '@/templates/mailresetpass'
import { Context } from 'koa'

export default class NodeMailer {
    static async resetPass(ctx: Context, email) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'huongtestserver@gmail.com', // email hoặc username
                pass: '@huongtest4blog' // password
            }
        });
        //Check if connected successfully
        transporter.verify((error, success) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Nodemailer connected!');
            }
        });
        const mail = {
            from: 'huongtestserver@gmail.com',
            to: '', 
            subject: 'Huong VuejsBlog - Reset your password',
            html: mailresetpass(email) // Nội dung mail dạng html
        };
        //Tiến hành gửi email
        transporter.sendMail(mail, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
}

