const nodemailer = require('nodemailer')
import { mailresetpass } from '@/templates/mailresetpass'
import UserModel from '@/models/UserModel'
import { Context } from 'koa'

export default class NodeMailer {
    static async resetPass(ctx: Context) {
        const userEmail = ctx.request.body
        const findUser = await UserModel.findOne({ email: userEmail.email }).lean()
        if (findUser == null) {
            ctx.throw(400, 'No User Found')
        } else {
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                requireTLS: true,
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
                to: userEmail.email,
                subject: 'Huong VuejsBlog - Reset your password',
                html: mailresetpass(userEmail.email) // Nội dung mail dạng html
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
}

