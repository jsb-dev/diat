import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Divider } from '@mui/material';
import { RootState } from '@/redux/store';
import AccountSettingsList from './AccountSettingsList';
import AccountSettingsContent from './account-settings-content/AccountSettingsContent';

const AccountSettingsMenu = () => {
    const { viewportIsPortable, viewportIsVertical } = useSelector((state: RootState) => state.ui);
    const [selectedMenu, setSelectedMenu] = useState('changePassword');

    const containerStyle = {
        display: 'flex',
        flexDirection: viewportIsPortable || viewportIsVertical ? 'column' : 'row',
        alignItems: 'center',
        width: viewportIsPortable || viewportIsVertical ? '90%' : '100%',
        margin: 0,
        height: 'fit-content',
        padding: '2rem 0'
    };

    const subContainerStyles = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        margin: '1rem',
        padding: 0
    }

    return (
        <Container component='section' className='secondary-container' sx={containerStyle}>
            <Container sx={{
                ...subContainerStyles, width: viewportIsPortable || viewportIsVertical ? '' : '60%',
                padding: '2rem',
            }}>
                <AccountSettingsList selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} viewportIsPortable={viewportIsPortable} viewportIsVertical={viewportIsVertical} />
            </Container>
            {viewportIsPortable || viewportIsVertical && (<Divider sx={{
                margin: '3rem'
            }} />)}
            <Container sx={{
                ...subContainerStyles,
                backgroundColor: '#7fb0d1c5',
                width: viewportIsPortable || viewportIsVertical ? '90%' : '100%',
                minHeight: viewportIsPortable || viewportIsVertical ? '380px' : '480px',
                padding: '3rem',
            }} >
                <AccountSettingsContent selectedMenu={selectedMenu} />
            </Container>
        </Container>
    );
};

export default AccountSettingsMenu;
