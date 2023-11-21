import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { textFieldStyle } from '@/assets/styles/SharedComponentStyles';

interface ChangeEmailFormProps {
    currentEmail: string;
    newEmail: string;
    confirmEmail: string;
    setCurrentEmail: (email: string) => void;
    setNewEmail: (email: string) => void;
    setConfirmEmail: (email: string) => void;
    handleEmailChange: () => void;
}

const ChangeEmailForm: React.FC<ChangeEmailFormProps> = ({
    currentEmail,
    newEmail,
    confirmEmail,
    setCurrentEmail,
    setNewEmail,
    setConfirmEmail,
    handleEmailChange
}) => {
    return (
        <>
            <TextField
                label='Current Email'
                type='email'
                fullWidth
                margin='normal'
                value={currentEmail}
                onChange={(e) => setCurrentEmail(e.target.value)}
                className='text-field-selector'
                sx={textFieldStyle}
            />
            <TextField
                label='New Email'
                type='email'
                fullWidth
                margin='normal'
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className='text-field-selector'
                sx={textFieldStyle}
            />
            <TextField
                label='Confirm New Email'
                type='email'
                fullWidth
                margin='normal'
                value={confirmEmail}
                onChange={(e) => setConfirmEmail(e.target.value)}
                onPaste={(e) => {
                    e.preventDefault();
                    console.error('Pasting email is not allowed.');
                }}
                className='text-field-selector'
                sx={{ ...textFieldStyle, marginBottom: '3rem' }}
            />
            <Button variant='contained' className='primary-btn' onClick={handleEmailChange} sx={{
                minWidth: '200px',
            }}>
                Change Email
            </Button>
        </>
    );
};

export default ChangeEmailForm;
