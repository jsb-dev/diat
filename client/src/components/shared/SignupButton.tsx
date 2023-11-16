import React from 'react';
import { Button } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import { useRouter } from 'next/router';

const SignupButton: React.FC = () => {
    const { isAuthenticated, loginWithRedirect } = useAuth0();
    const router = useRouter();

    const handleDashboard = () => {
        router.push('/dashboard-page');
    };

    return (
        <>
            {isAuthenticated ? (
                <Button onClick={handleDashboard} className='pentenary-btn'>Go to Dashboard</Button>
            ) : (
                <Button onClick={() => loginWithRedirect()} className='pentenary-btn'>Sign Up</Button>
            )}
        </>
    );
};

export default SignupButton;