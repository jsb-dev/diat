import sendEmail from '../../utils/sendEmail.js';
import validator from 'validator';
import dotenv from 'dotenv';

const EmailType = {
  PUBLIC_QUERY: 'PUBLIC QUERY',
  ACCOUNT_HELP_REQUEST: 'ACCOUNT HELP REQUEST',
};

const postContactMsg = (emailType) => (req, res) => {
  dotenv.config();

  const SMTP_USER = process.env.SMTP_USER;
  const SMTP_INBOX = process.env.SMTP_INBOX;

  const { userEmail, subject, message } = req.body;

  try {
    if (!validator.isEmail(userEmail)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid Email',
        message: 'Please enter a valid email address',
      });
    }

    const emailSubjectPrefix =
      emailType === EmailType.PUBLIC_QUERY
        ? 'PUBLIC QUERY: \n'
        : 'ACCOUNT HELP REQUEST: \n';

    sendEmail(
      SMTP_INBOX,
      SMTP_USER,
      subject,
      emailSubjectPrefix,
      '<p>' + message + '</p><br /><p>From: ' + userEmail + '</p>'
    );

    res.send({
      success: true,
      message: 'Your message has been sent. We will be in touch soon!',
    });
  } catch (e) {
    console.error(e);
    console.log(e.message);
    return res.status(500).json({
      success: false,
      error: e,
      message:
        'Something went wrong. Please try again later, or contact us directly at support@applicate.dev',
    });
  }
};

export { postContactMsg, EmailType };
