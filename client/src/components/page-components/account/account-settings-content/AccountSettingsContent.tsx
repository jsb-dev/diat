import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Container, TextField, Button, Typography, Divider } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import { clearAuthState } from '@redux/slices/authSlice';
import { clearDiagram } from '@redux/slices/flowSlice';
import { clearUser, selectUser } from '@redux/slices/userSlice';
import ContactForm from '@/components/shared/ContactForm';
import ChangeEmailForm from './ChangeEmailForm';

interface AccountSettingsContentProps {
    selectedMenu: string;
}

const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    height: 'fit-content',
};

const buttonStyles = {
    minWidth: '200px',
}

const textFieldStyle = {
    '& label.Mui-focused': {
        color: '#51c2b3',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#51c2b3',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'white',
        },
        '&:hover fieldset': {
            borderColor: '#9ce9e9',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#51c2b3',
        },
        '& input': {
            color: 'white',
            '&:hover': {
                color: '#9ce9e9',
            },
            '&:focus': {
                color: '#51c2b3',
            },
        },
    },
};

const AccountSettingsContent: React.FC<AccountSettingsContentProps> = ({ selectedMenu }) => {
    const [credentialsCleared, setCredentialsCleared] = useState(false);
    const [currentEmail, setCurrentEmail] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [deleteEmail, setDeleteEmail] = useState('');
    const [confirmDeleteEmail, setConfirmDeleteEmail] = useState('');
    const [deleteConfirmation, setDeleteConfirmation] = useState('');
    const { viewportIsPortable, viewportIsVertical } = useSelector((state: RootState) => state.ui);

    const dividerStyle = {
        marginTop: '20rem',
    };

    const user = useSelector(selectUser);
    const { loginWithRedirect, logout } = useAuth0();
    const router = useRouter();
    const dispatch = useDispatch();

    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    useEffect(() => {
        const performLogoutAndRedirect = async () => {
            if (credentialsCleared) {
                try {
                    await logout({ logoutParams: { returnTo: window.location.origin } });
                    router.replace('/');
                    await loginWithRedirect();
                } catch (error) {
                    console.error('Logout failed:', error);
                }
            }
        };

        performLogoutAndRedirect();
    }, [credentialsCleared, logout, loginWithRedirect, router, user]);

    const handlePasswordChange = () => {
        handleClearCredentials();
    };

    const handleClearCredentials = () => {
        dispatch(clearAuthState());
        dispatch(clearDiagram());
        dispatch(clearUser());
        setCredentialsCleared(true);
    };

    const handleSubmitMsg = async () => {
        if (!userEmail || !subject || !message) {
            console.error('All fields are required.');
            return;
        } else if (!userEmail.includes('@') || !userEmail.includes('.')) {
            console.error('Invalid email.');
            return;
        } else if (userEmail !== user.email) {
            console.error('The email does not match your account.');
            return;
        }

        try {
            const response = await fetch(`${BACKEND_URL}/contact/help`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userEmail, subject, message }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            } else if (response.status === 200) {
                console.log('Message sent successfully.');
                setUserEmail('');
                setSubject('');
                setMessage('');
            }

        } catch (err) {
            console.error('Error submitting form:', err);
        }
    };

    const handleEmailChange = async () => {
        if (!currentEmail || !newEmail || !confirmEmail) {
            console.error('All fields are required.');
            return;
        } else if (!currentEmail.includes('@') || !currentEmail.includes('.')) {
            console.error('Invalid current email.');
            return;
        } else if (newEmail === currentEmail) {
            console.error('The new email must be different from the current email.');
            return;
        } else if (currentEmail !== user.email) {
            console.error('The current email does not match your account.');
            return;
        } else if (newEmail !== confirmEmail) {
            console.error('The new emails do not match.');
            return;
        }

        try {
            const emailUpdated = await updateEmail();
            if (emailUpdated) {
                console.log('Email updated successfully.');
                setCurrentEmail('');
                setNewEmail('');
                setConfirmEmail('');
                handleClearCredentials();
            } else {
                console.error('Failed to update email.');
            }
        } catch (error) {
            console.error('Error updating email:', error);
        }
    };

    const handleDeleteAccount = async () => {
        if (!deleteEmail || !confirmDeleteEmail || deleteConfirmation !== 'DELETE') {
            console.error('All fields are required and DELETE must be typed in the confirmation field.');
            return;
        } else if (deleteEmail !== confirmDeleteEmail) {
            console.error('Email addresses must match.');
            return;
        } else if (deleteEmail !== user.email) {
            console.error('The email does not match your account.');
            console.log(deleteEmail);
            console.log(user.email);
            return;
        }

        try {
            const response = await fetch(`${BACKEND_URL}/user/delete/account`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userEmail: deleteEmail, diagramId: user.diagramId }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            console.log('Account deleted successfully.');
            setDeleteEmail('');
            setConfirmDeleteEmail('');
            setDeleteConfirmation('');
            handleClearCredentials();

        } catch (error) {
            console.error('Error deleting account:', error);
        }
    };

    const updateEmail = async () => {
        const response = await fetch(`${BACKEND_URL}/user/update/email`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                currentEmail,
                newEmail,
            }),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        } else if (response.status === 200) {
            console.log('Email updated successfully.');
            setCurrentEmail('');
            setNewEmail('');
        }

        return response.json();
    };

    const contentMap: { [key: string]: JSX.Element } = {
        changePassword: (
            <Container sx={
                containerStyle
            }>
                <Divider sx={{ marginTop: '6rem' }} />
                <Typography
                    variant='body1'
                    className='p-selector'
                    sx={{
                        marginBottom: '3rem',
                        padding: 0,
                        textAlign: 'center',
                    }}
                >To change your password, you will be logged out and redirected to our secure authentication page.</Typography>
                <Button variant='contained' className='primary-btn' onClick={handlePasswordChange} sx={buttonStyles}>
                    Change Password
                </Button>
            </Container>
        ),
        changeEmail: (
            <Container sx={
                containerStyle
            }>
                {
                    (viewportIsPortable || viewportIsVertical) && (
                        <Divider sx={dividerStyle} />
                    )
                }
                <ChangeEmailForm
                    currentEmail={currentEmail}
                    newEmail={newEmail}
                    confirmEmail={confirmEmail}
                    setCurrentEmail={setCurrentEmail}
                    setNewEmail={setNewEmail}
                    setConfirmEmail={setConfirmEmail}
                    handleEmailChange={handleEmailChange}
                />
            </Container>
        ),
        help: (
            <Container sx={containerStyle}>
                {
                    (viewportIsPortable || viewportIsVertical) && (
                        <Divider sx={{ marginTop: '30rem' }} />
                    )
                }
                <ContactForm
                    userEmail={userEmail}
                    subject={subject}
                    message={message}
                    setUserEmail={setUserEmail}
                    setSubject={setSubject}
                    setMessage={setMessage}
                    handleSubmitMsg={handleSubmitMsg}
                />
            </Container>
        ),
        deleteAccount: (
            <Container sx={
                containerStyle
            }>
                {
                    (viewportIsPortable || viewportIsVertical) && (
                        <Divider sx={dividerStyle} />
                    )
                }
                <TextField
                    label='Email'
                    type='email'
                    fullWidth
                    margin='normal'
                    value={deleteEmail}
                    onChange={(e) => setDeleteEmail(e.target.value)}
                    className='text-field-selector'
                    sx={textFieldStyle}
                />
                <TextField
                    label='Confirm Email'
                    type='email'
                    fullWidth
                    margin='normal'
                    value={confirmDeleteEmail}
                    onChange={(e) => setConfirmDeleteEmail(e.target.value)}
                    onPaste={(e) => {
                        e.preventDefault();
                        console.error('Pasting email is not allowed.');
                    }}
                    className='text-field-selector'
                    sx={textFieldStyle}
                />
                <TextField
                    label='Type DELETE to confirm'
                    fullWidth
                    margin='normal'
                    value={deleteConfirmation}
                    onChange={(e) => setDeleteConfirmation(e.target.value)}
                    onPaste={(e) => {
                        e.preventDefault();
                        console.error('Pasting is not allowed.');
                    }}
                    className='text-field-selector'
                    sx={{ ...textFieldStyle, marginBottom: '3rem' }}
                />
                <Button variant='contained' className='primary-btn' onClick={handleDeleteAccount} sx={buttonStyles}>
                    Delete Account
                </Button>
            </Container>
        ),
    };

    return contentMap[selectedMenu] || <Container sx={containerStyle}>Select an option from the menu.</Container>;
};

export default AccountSettingsContent;