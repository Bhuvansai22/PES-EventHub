import dotenv from 'dotenv';
import sendEmail from './sendEmail.js';

dotenv.config({ path: './.env' });

const testBrevo = async () => {
    try {
        console.log('Attempting to send test email via Brevo...');
        await sendEmail({
            email: process.env.FROM_EMAIL, // Send to yourself
            subject: 'Brevo SMTP Test Connection',
            message: 'If you are reading this, your Brevo SMTP configuration for PES EventHub is working correctly!',
        });
        console.log('✅ Test email sent successfully! Please check your inbox.');
    } catch (error) {
        console.error('❌ Failed to send test email.');
        console.error(error);
    }
};

testBrevo();
