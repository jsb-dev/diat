import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { textFieldStyle } from '@/assets/styles/SharedComponentStyles';

interface DeleteAccountFormProps {
    deleteEmail: string;
    setDeleteEmail: (email: string) => void;
    confirmDeleteEmail: string;
    setConfirmDeleteEmail: (email: string) => void;
    deleteConfirmation: string;
    setDeleteConfirmation: (confirmation: string) => void;
    handleDeleteAccount: () => void;
}

const DeleteAccountForm: React.FC<DeleteAccountFormProps> = ({
    deleteEmail,
    setDeleteEmail,
    confirmDeleteEmail,
    setConfirmDeleteEmail,
    deleteConfirmation,
    setDeleteConfirmation,
    handleDeleteAccount,
}) => {
    return (
        <>
            <TextField
                label="Email"
                type="email"
                fullWidth
                margin="normal"
                value={deleteEmail}
                onChange={(e) => setDeleteEmail(e.target.value)}
                className="text-field-selector"
                sx={textFieldStyle}
            />
            <TextField
                label="Confirm Email"
                type="email"
                fullWidth
                margin="normal"
                value={confirmDeleteEmail}
                onChange={(e) => setConfirmDeleteEmail(e.target.value)}
                onPaste={(e) => {
                    e.preventDefault();
                    console.error('Pasting email is not allowed.');
                }}
                className="text-field-selector"
                sx={textFieldStyle}
            />
            <TextField
                label="Type DELETE to confirm"
                fullWidth
                margin="normal"
                value={deleteConfirmation}
                onChange={(e) => setDeleteConfirmation(e.target.value)}
                onPaste={(e) => {
                    e.preventDefault();
                    console.error('Pasting is not allowed.');
                }}
                className="text-field-selector"
                sx={textFieldStyle}
            />
            <Button variant="contained" className="primary-btn" onClick={handleDeleteAccount}>
                Delete Account
            </Button>
        </>
    );
};

export default DeleteAccountForm;
