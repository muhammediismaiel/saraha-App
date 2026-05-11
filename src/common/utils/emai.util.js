import nodemailer from "nodemailer";

export function sendEmail(email, subject, message) {
    const transporter=nodemailer.createTransport({
        service:'gmail',
        port:587,
        host:'smtp.gmail.com',
        auth:{
            user:''||process.env.EMAIL,
            pass:''||process.env.PASSWORD
        }
    })
    transporter.sendMail({
        from:"saraha app < >"||process.env.EMAIL,
        to:email,
        subject:subject,
        html:message
    })
    nodemailer.sendMail({})
} 