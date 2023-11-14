import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@mui/material';
import PageShell from '@/components/shared/page-shell/PageShell';
import AccountSettingsMenu from '@/components/page-components/account/AccountSettingsMenu';
import { useAuth0 } from '@auth0/auth0-react';
import { setAuthState } from '@/redux/slices/authSlice';
import { setUser, getCachedAuthState, getCachedUserCredentials } from '@/redux/slices/userSlice';
import { updateLayout } from '@/redux/slices/uiSlice';
import { User } from '@/interfaces/User';
import LoadingSpinner from '@/components/shared/LoadingSpinner';

function AccountPage() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userCredentials] = useState<User | null>(null);
    const dispatch = useDispatch();
    const authState = useSelector((state: any) => state.auth);
    const { isAuthenticated, user, isLoading } = useAuth0();

    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    useEffect(() => {
        if (isLoading) {
            return;
        }

        const initializeFromCache = async () => {
            const cachedUserCredentials = await getCachedUserCredentials();
            const cachedAuthState = getCachedAuthState();

            if (cachedUserCredentials) {
                dispatch(setUser(cachedUserCredentials));
            }

            if (cachedAuthState) {
                dispatch(setAuthState(cachedAuthState));
            }
        };

        const getUserDetails = async (email: string) => {
            try {
                const response = await fetch(`${BACKEND_URL}/user/get/credentials?email=${email}`);
                if (response.ok) {
                    return await response.json();
                } else {
                    console.error('Error fetching user details', await response.text());
                    return null;
                }
            } catch (error) {
                console.error('Error fetching user details', error);
                return null;
            }
        };

        const fetchAndUpdateDetails = async () => {
            if (user?.email && isAuthenticated) {
                if (!loggedIn) {
                    try {
                        const responseData = await getUserDetails(user.email);
                        if (!responseData) {
                            console.log("No response data.");
                            return;
                        }

                        const { user: fetchedUser, diagram: fetchedDiagram } = responseData;

                        dispatch(setUser(fetchedUser));
                        dispatch(setAuthState({
                            isAuthenticated: true,
                            user: fetchedUser,
                        }));
                        setLoading(false);
                    } catch (e) {
                        console.error('Error fetching user details', e);
                    }
                }
            }
        };

        initializeFromCache();
        fetchAndUpdateDetails();
        setLoggedIn(isAuthenticated);

        if (!loading) {
            return
        }
    }
        , [isAuthenticated, user, dispatch, authState.accessToken, isLoading, loading, loggedIn, BACKEND_URL, userCredentials]);

    useEffect(() => {
        const handleResize = () => {
            dispatch(updateLayout({ innerWidth: window.innerWidth, innerHeight: window.innerHeight }));
        };

        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, [dispatch]);


    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    };

    const main = loading ? (
        <LoadingSpinner />
    ) : (
        <Container component="main" className='primary-section' sx={containerStyle}>
            <AccountSettingsMenu />
        </Container>
    );

    return (
        <PageShell content={main} page={'account-page'} />
    );
}

export default AccountPage;
