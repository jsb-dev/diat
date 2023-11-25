import React from 'react';
import { Button } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import { useRouter } from 'next/router';

const buttonStyles = {
    minWidth: '120px',
    minHeight: '50px',
}

const SignupButton: React.FC = () => {
    const { isAuthenticated, loginWithRedirect } = useAuth0();
    const router = useRouter();

    const handleDashboard = () => {
        router.push('/dashboard-page');
    };

    return (
        <>
            {isAuthenticated ? (
                <Button onClick={handleDashboard} className='pentenary-btn' sx={buttonStyles}>Dashboard</Button>
            ) : (
                <Button onClick={() => loginWithRedirect()} className='pentenary-btn' sx={buttonStyles}>Sign Up</Button>
            )}
        </>
    );
};

export default SignupButton;
