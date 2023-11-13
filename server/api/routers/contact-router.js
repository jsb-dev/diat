import express from 'express';
import {
  postContactMsg,
  EmailType,
} from '../controllers/contact/postContactMsg.js';

const router = express.Router();

router.post('/enquiry', postContactMsg(EmailType.PUBLIC_QUERY));
router.post('/help', postContactMsg(EmailType.ACCOUNT_HELP_REQUEST));

export default router;
