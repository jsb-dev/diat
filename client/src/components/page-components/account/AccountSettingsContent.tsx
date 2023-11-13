import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, TextField, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth0 } from "@auth0/auth0-react";
import { clearAuthState } from '@redux/slices/authSlice';
import { clearDiagram } from '@redux/slices/flowSlice';
import { clearUser, selectUser } from '@redux/slices/userSlice';

interface AccountSettingsContentProps {
    selectedMenu: string;
}

const boxStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
};

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

    const user = useSelector(selectUser);
    const { loginWithRedirect, logout } = useAuth0();
    const router = useRouter();
    const dispatch = useDispatch();

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const logoutUrl = process.env.NEXT_PUBLIC_LOGOUT_URL;

    useEffect(() => {
        const performLogoutAndRedirect = async () => {
            if (credentialsCleared) {
                try {
                    logout({ logoutParams: { returnTo: window.location.origin } });
                    router.replace('/');
                    await loginWithRedirect({
                        authorizationParams: {
                            redirect_uri: logoutUrl
                        }
                    });
                } catch (error) {
                    console.error('Logout failed:', error);
                }
            }
        };

        console.log(user);

        performLogoutAndRedirect();
    }, [credentialsCleared, logout, loginWithRedirect, router, user, logoutUrl]);

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
            const response = await fetch(`${backendUrl}/contact/help`, {
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
            const response = await fetch(`${backendUrl}/user/delete/account`, {
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
        const response = await fetch(`${backendUrl}/user/update/email`, {
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
            <Box sx={boxStyle}>
                <p>To change your password, you will be logged out and redirected to our secure authentication page.</p>
                <Button variant="contained" className="primary-btn" onClick={handlePasswordChange}>
                    Change Password
                </Button>
            </Box>
        ),
        changeEmail: (
            <Box sx={boxStyle}>
                <TextField
                    label="Current Email"
                    type="email"
                    fullWidth
                    margin="normal"
                    value={currentEmail}
                    onChange={(e) => setCurrentEmail(e.target.value)}
                    className="text-field-selector"
                    sx={textFieldStyle}
                />
                <TextField
                    label="New Email"
                    type="email"
                    fullWidth
                    margin="normal"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="text-field-selector"
                    sx={textFieldStyle}
                />
                <TextField
                    label="Confirm New Email"
                    type="email"
                    fullWidth
                    margin="normal"
                    value={confirmEmail}
                    onChange={(e) => setConfirmEmail(e.target.value)}
                    onPaste={(e) => {
                        e.preventDefault();
                        console.error('Pasting email is not allowed.');
                    }}
                    className="text-field-selector"
                    sx={textFieldStyle}
                />
                <Button variant="contained" className="primary-btn" onClick={handleEmailChange}>
                    Change Email
                </Button>
            </Box>
        ),
        help: (
            <Box sx={{ boxStyle }}>
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
            </Box>
        ),
        deleteAccount: (
            <Box sx={boxStyle}>
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
            </Box>
        ),
    };

    return contentMap[selectedMenu] || <Box sx={boxStyle}>Select an option from the menu.</Box>;
};

export default AccountSettingsContent;