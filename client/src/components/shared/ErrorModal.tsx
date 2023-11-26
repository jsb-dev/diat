import React from 'react';
import {
    Container,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText
} from '@mui/material';
import Button from '@mui/material/Button';

interface ErrorModalProps {
    message: string;
    onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ message, onClose }) => {
    return (
        <Container className='modal-background'>
            <Container className='modal-container' sx={{
                position: 'fixed',
                top: '50%',
                left: '50%',
            }}>
                <Dialog open={true} onClose={onClose}>
                    <DialogTitle>Error</DialogTitle>
                    <DialogContent>
                        <DialogContentText>{message}</DialogContentText>
                    </DialogContent>
                    <Button onClick={onClose} variant='contained' autoFocus className='primary-btn'>
                        Close
                    </Button>
                </Dialog>
            </Container>
        </Container>
    );
};

export default ErrorModal;