import React from 'react';
import { Button } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import { useRouter } from 'next/router';

const SignupButton: React.FC = () => {
    const { isAuthenticated, loginWithRedirect } = useAuth0();
    const router = useRouter();

    const handleDashboard = () => {
        router.push('/dashboard');
    };

    return (
        <>
            {isAuthenticated ? (
                <Button onClick={handleDashboard}>Go to Dashboard</Button>
            ) : (
                <Button onClick={() => loginWithRedirect()}>Sign Up</Button>
            )}
        </>
    );
};

export default SignupButton;
