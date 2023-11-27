import React from 'react';
import { Button } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';

const buttonStyles = {
    minWidth: '120px',
    minHeight: '50px',
}

const SignupButton: React.FC = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <Button onClick={() => loginWithRedirect()} className='secondary-btn' sx={buttonStyles}>Sign Up</Button>
    );
};

export default SignupButton;
