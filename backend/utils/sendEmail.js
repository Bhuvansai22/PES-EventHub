import * as SibApiV3Sdk from '@getbrevo/brevo';

const sendEmail = async (options) => {
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    apiInstance.authentications['apiKey'].apiKey = process.env.BREVO_API_KEY;

    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    sendSmtpEmail.subject = options.subject;
    sendSmtpEmail.textContent = options.message;
    sendSmtpEmail.sender = {
        name: process.env.FROM_NAME,
        email: process.env.FROM_EMAIL,
    };
    sendSmtpEmail.to = [{ email: options.email }];

    const info = await apiInstance.sendTransacEmail(sendSmtpEmail);

    console.log('Message sent: %s', info.messageId);
};

export default sendEmail;
