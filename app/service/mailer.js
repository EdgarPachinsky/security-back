import nodemailer from "nodemailer";
import mailer_constants from "../constant/mailer_constants.js";

export default {
    /**
     * Service to send mails
     * @param {Object} options
     * @returns {Promise<void>}
     */
    send: async (options) => {

        let testAccount = await nodemailer.createTestAccount();

        let transporter = nodemailer.createTransport(
            mailer_constants.getTransportOptions("smtp.ethereal.email",587,false,testAccount)
        );

        let info = await transporter.sendMail(options);

        if(info.messageId) {
            console.log('Message sent !')
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        }
        else
            console.log('Message sent failed !')
    }
}