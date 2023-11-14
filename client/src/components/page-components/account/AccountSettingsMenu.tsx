import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Container } from '@mui/material';
import { RootState } from '@/redux/store';
import AccountSettingsList from './AccountSettingsList';
import AccountSettingsContent from './account-settings-content/AccountSettingsContent';

const AccountSettingsMenu = () => {
    const { viewportIsPortable, viewportIsVertical } = useSelector((state: RootState) => state.ui);
    const [selectedMenu, setSelectedMenu] = useState('changePassword');

    const containerStyle = {
        display: 'flex',
        borderRadius: '1rem',
        flexDirection: viewportIsPortable || viewportIsVertical ? 'column' : 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '85%',
        height: '85%',
    };

    return (
        <Container component="section" className="secondary-container" sx={containerStyle}>
            <AccountSettingsList selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
            <AccountSettingsContent selectedMenu={selectedMenu} />
        </Container>
    );
};

export default AccountSettingsMenu;
