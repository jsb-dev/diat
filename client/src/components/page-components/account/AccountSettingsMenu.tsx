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
        minHeight: viewportIsPortable || viewportIsVertical ? '90dvh' : '80dvh',
        padding: '2dvh 0'
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
        <Container component='section' sx={containerStyle}>
            <Container sx={{
                ...subContainerStyles,
                width: viewportIsPortable || viewportIsVertical ? '' : '60%',
                padding: '2dvh',
            }}>
                <AccountSettingsList selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} viewportIsPortable={viewportIsPortable} viewportIsVertical={viewportIsVertical} />
            </Container>
            {viewportIsPortable || viewportIsVertical && (<Divider sx={{
                margin: '3dvh'
            }} />)}
            <Container className='primary-container' sx={{
                ...subContainerStyles,
                width: viewportIsPortable || viewportIsVertical ? '90%' : '100%',
                padding: viewportIsPortable || viewportIsVertical ? 0 : '3dvh',
                height: viewportIsPortable || viewportIsVertical ? '30dvh' : '70dvh',
                boxShadow: '0 0 1rem 0.5rem rgba(0, 0, 0, 0.2), inset 0 0.5rem 1rem 0.5rem rgba(0, 0, 0, 0.19)',
                minHeight: 'max(250px, 40dvh)',
                ...viewportIsPortable && {
                    overflowX: 'hidden',
                    ...(selectedMenu !== 'changePassword' && {
                        ...viewportIsVertical && {
                            overflowY: 'scroll',
                        },
                    }),
                }
            }} >
                <AccountSettingsContent
                    selectedMenu={selectedMenu}
                    viewportIsPortable={viewportIsPortable}
                    viewportIsVertical={viewportIsVertical}
                />
            </Container>
        </Container >
    );
};

export default AccountSettingsMenu;
