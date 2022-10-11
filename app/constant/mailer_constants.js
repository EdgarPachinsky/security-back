export default  {
    /**
     *
     * @param {String} smtp
     * @param {Number} port
     * @param {Boolean} secure
     * @param {Object} account
     * @returns {{ port: number, auth: {pass: *, user}, host: string, secure: boolean }}
     */
    getTransportOptions: (smtp, port,secure,account) => {
        return {
            host: smtp,
            port: port,
            secure: secure, // true for 465, false for other ports
            auth: {
                user: account.user, // generated ethereal user
                pass: account.pass, // generated ethereal password
            },
        }
    },

    /**
     *
     * @param {String} from
     * @param {String} to
     * @param {String} subject
     * @param {String} text
     * @param {String} html
     * @returns {{subject: string, from: string, html: string, to: string, text: string}}
     */
    getSendOptions: (from,to,subject,text,html) => {
        return {
            from: from, // sender address
            to: to, // list of receivers example "test@gmail.com , test2@gmail.com "
            subject: subject, // Subject line
            text: text, // plain text body
            html: html, // html body
        }
    }
}
