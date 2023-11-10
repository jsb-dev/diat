import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, TextField, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth0 } from "@auth0/auth0-react";
import { clearAuthState } from '@redux/slices/authSlice';
import { clearDiagram } from '@redux/slices/flowSlice';
import { clearUser } from '@redux/slices/userSlice';

interface AccountSettingsContentProps {
    selectedMenu: string;
}

const boxStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '50%',
    height: '50%',
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
    const user = useSelector((state: any) => state.user);
    const { loginWithRedirect, logout } = useAuth0();
    const router = useRouter();
    const dispatch = useDispatch();

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    const handleClearCredentials = () => {
        dispatch(clearAuthState());
        dispatch(clearDiagram());
        dispatch(clearUser());
        setCredentialsCleared(true); 0
    };

    useEffect(() => {
        const performLogoutAndRedirect = async () => {
            if (credentialsCleared) {
                try {
                    logout({ logoutParams: { returnTo: window.location.origin } });
                    router.replace('/');
                    await loginWithRedirect();
                } catch (error) {
                    console.error('Logout failed:', error);
                }
            }
        };

        performLogoutAndRedirect();
    }, [credentialsCleared, logout, loginWithRedirect, router]);

    const handlePasswordChange = () => {
        handleClearCredentials();
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
        }

        return response.json();
    };

    const handleEmailChange = async () => {
        if (!currentEmail || !newEmail || !confirmEmail) {
            console.error('All fields are required.');
            return;
        }

        if (newEmail === currentEmail) {
            console.error('The new email must be different from the current email.');
            return;
        }

        if (currentEmail !== user.email) {
            console.error('The current email does not match your account.');
            return;
        }

        if (newEmail !== confirmEmail) {
            console.error('The new emails do not match.');
            return;
        }

        try {
            const emailUpdated = await updateEmail();
            if (emailUpdated) {
                handleClearCredentials();
            } else {
                console.error('Failed to update email.');
            }
        } catch (error) {
            console.error('Error updating email:', error);
            if (error instanceof Error && error.message) {
                console.error(error.message);
            }
        }
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
            <Box sx={boxStyle}>
                {/* Help content */}
            </Box>
        ),
        deleteAccount: (
            <Box sx={boxStyle}>
                {/* Account deletion content */}
            </Box>
        ),
    };

    return contentMap[selectedMenu] || <Box sx={boxStyle}>Select an option from the menu.</Box>;
};

export default AccountSettingsContent;