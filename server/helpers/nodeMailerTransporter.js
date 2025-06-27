import nodemailer from 'nodemailer'



export const nodeMailerTransporter = () => {
        return nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.NODE_GMAIL_SENDER,
                pass:process.env.NODE_GMAIL_PASS
            }
        })
}