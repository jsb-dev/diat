import React from 'react';
import { RadioGroup, FormControlLabel, Radio, Container } from '@mui/material';

interface AccountSettingsListProps {
    selectedMenu: string;
    setSelectedMenu: (menu: string) => void;
    viewportIsVertical?: boolean;
    viewportIsPortable?: boolean;
}

const radioStyles = {
    color: 'white',
    '&.Mui-checked': {
        color: '#51c2b3',
    },
};

const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
}

const labelStyles = {
    padding: 0,
    margin: 0,
    height: '50%',
};

const styledRadio = <Radio sx={radioStyles} />;

const AccountSettingsList: React.FC<AccountSettingsListProps> = ({ selectedMenu, setSelectedMenu, viewportIsVertical, viewportIsPortable }) => (
    <RadioGroup
        value={selectedMenu}
        onChange={(event) => setSelectedMenu(event.target.value)}
        name='account-settings-options'
    >
        <Container sx={{
            height: '100%',
            margin: 0,
            padding: 0,
            ...(viewportIsVertical || viewportIsPortable ? {
                display: 'flex',
                justifyContent: 'space-between',
            } : {})
        }}>
            <Container sx={{
                ...(viewportIsVertical || viewportIsPortable ? containerStyles : {})
            }}>
                <FormControlLabel
                    value='changePassword'
                    control={styledRadio}
                    label='Change Password'
                    className='radio-control'
                    sx={labelStyles}
                />
                <FormControlLabel
                    value='changeEmail'
                    control={styledRadio}
                    label='Change Email'
                    className='radio-control'
                    sx={labelStyles}
                />
            </Container>
            <Container sx={{
                ...(viewportIsVertical || viewportIsPortable ? { containerStyles } : {}),
            }}>
                <FormControlLabel
                    value='help'
                    control={styledRadio}
                    label='Contact Help'
                    className='radio-control'
                    sx={labelStyles}
                />
                <FormControlLabel
                    value='deleteAccount'
                    control={styledRadio}
                    label='Delete Account'
                    className='radio-control'
                    sx={labelStyles}
                />
            </Container>
        </Container>
    </RadioGroup>
);

export default AccountSettingsList;
