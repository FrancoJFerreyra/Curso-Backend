import { createTransport } from "nodemailer";

const transporter = createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: 'franquitodebanfield@gmail.com',
        pass: 'rfvabsabiyqhiikw'
    }
});


const mailOptions = {
    from: 'Servidor Node.js',
    to: 'franquitodebanfield@gmail.com',
    subject: '',
    html: ''
}

const send = async (options) => {
    try {
        const info = await transporter.sendMail(options);
        console.log(info);
    } catch (error) {
        console.log(error);
    }
}
export {
    mailOptions,
    send
}