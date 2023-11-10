import React from 'react';
import { RadioGroup, FormControlLabel, Radio } from '@mui/material';

interface AccountSettingsListProps {
    selectedMenu: string;
    setSelectedMenu: (menu: string) => void;
}

const radioStyle = {
    color: 'white',
    '&.Mui-checked': {
        color: '#51c2b3',
    },
};

const styledRadio = <Radio sx={radioStyle} />;

const AccountSettingsList: React.FC<AccountSettingsListProps> = ({ selectedMenu, setSelectedMenu }) => (
    <RadioGroup
        value={selectedMenu}
        onChange={(event) => setSelectedMenu(event.target.value)}
        name="account-settings-options"
    >
        <FormControlLabel
            value="changePassword"
            control={styledRadio}
            label="Change Password"
            className="radio-control"
        />
        <FormControlLabel
            value="changeEmail"
            control={styledRadio}
            label="Change Email"
            className="radio-control"
        />
        <FormControlLabel
            value="help"
            control={styledRadio}
            label="Help"
            className="radio-control"
        />
        <FormControlLabel
            value="deleteAccount"
            control={styledRadio}
            label="Delete Account"
            className="radio-control"
        />
    </RadioGroup>
);

export default AccountSettingsList;
