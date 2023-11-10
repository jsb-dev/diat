import dotenv from 'dotenv';
import sgMail from '@sendgrid/mail';

dotenv.config();

const sendEmail = (to, from, subject, text, html) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: to,
    from: from,
    subject: subject,
    text: text,
    html: html,
  };

  try {
    sgMail.send(msg);
  } catch (error) {
    console.error(error);
  }
};

export default sendEmail;
