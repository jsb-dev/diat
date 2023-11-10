import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container } from '@mui/material';
import { updateLayout } from '@/redux/slices/uiSlice';
import PageShell from '@/components/shared/page-shell/PageShell';
import AccountSettingsMenu from '@/components/page-components/account/AccountSettingsMenu';

function AccountPage() {
    const dispatch = useDispatch();

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

    const main = (
        <Container component="main" className='primary-section' sx={containerStyle}>
            <AccountSettingsMenu />
        </Container>
    );

    return (
        <PageShell content={main} page={'account-page'} />
    );
}

export default AccountPage;
