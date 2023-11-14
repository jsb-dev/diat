import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { textFieldStyle } from '@/assets/styles/SharedComponentStyles';

interface ContactFormProps {
    userEmail: string;
    subject: string;
    message: string;
    setUserEmail: (email: string) => void;
    setSubject: (subject: string) => void;
    setMessage: (message: string) => void;
    handleSubmitMsg: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({
    userEmail,
    subject,
    message,
    setUserEmail,
    setSubject,
    setMessage,
    handleSubmitMsg
}) => {
    return (
        <>
            <TextField
                label="Email"
                type="email"
                fullWidth
                margin="normal"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="text-field-selector"
                sx={textFieldStyle}
            />
            <TextField
                label="Subject"
                fullWidth
                margin="normal"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="text-field-selector"
                sx={textFieldStyle}
            />
            <TextField
                label="Message"
                fullWidth
                margin="normal"
                multiline
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="text-field-selector"
                sx={textFieldStyle}
            />
            <Button variant="contained" className="primary-btn" onClick={handleSubmitMsg}>
                Send
            </Button>
        </>
    );
};

export default ContactForm;
