import React, { CSSProperties } from 'react';
import { Button } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import Link from 'next/link';
import AuthToggle from '@/components/shared/page-shell/page-shell-components/AuthToggle';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import ContactSupportRoundedIcon from '@mui/icons-material/ContactSupportRounded';
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import Tooltip from '@mui/material/Tooltip';

const itemStyle: CSSProperties = {
    position: 'fixed',
    cursor: 'pointer',
};

const NavList: React.FC = () => {
    const { isAuthenticated } = useAuth0();
    const { viewportIsVertical, viewportIsPortable } = useSelector((state: RootState) => state.ui);

    const listStyle: CSSProperties = {
        position: 'fixed',
        zIndex: 1006,
        right: !viewportIsVertical && viewportIsPortable ? '30rem'
            : viewportIsVertical ? 'max(26rem, 175px)'
                : '18rem',
        bottom: !viewportIsVertical && viewportIsPortable ? '50%'
            : viewportIsVertical ? '35%'
                : '38%',
    };

    return (
        <ul style={listStyle}>
            <li style={itemStyle}>
                <Link href='/' passHref >
                    <Tooltip
                        title='Home'
                        placement='bottom'
                        arrow
                    >
                        <Button className='primary-btn'>
                            <HomeRoundedIcon sx={{
                                fontSize: '3rem'
                            }}
                            />
                        </Button>
                    </Tooltip>
                </Link>
            </li>
            <li style={{ ...itemStyle, transform: 'translate(50%, 100%)' }}>
                <Link href='/info-page' passHref >
                    <Tooltip
                        title='Info'
                        placement='bottom'
                        arrow
                    >
                        <Button className='primary-btn'>
                            <InfoRoundedIcon sx={{
                                fontSize: '3rem'
                            }}
                            />
                        </Button>
                    </Tooltip>
                </Link>
            </li>
            <li style={{ ...itemStyle, transform: 'translateY(200%)' }}>
                <Link href='/contact-page' passHref >
                    <Tooltip
                        title='Contact'
                        placement='bottom'
                        arrow
                    >
                        <Button className='primary-btn'>
                            <ContactSupportRoundedIcon sx={{
                                fontSize: '3rem'
                            }}
                            />
                        </Button>
                    </Tooltip>
                </Link>
            </li>
            {isAuthenticated ? (
                <li style={{ ...itemStyle, transform: 'translate(-50%, 100%)' }}>
                    <Link href='/account-page' passHref >
                        <Tooltip
                            title='Account'
                            placement='bottom'
                            arrow
                        >
                            <Button className='primary-btn'>
                                <ManageAccountsRoundedIcon sx={{
                                    fontSize: '3rem'
                                }}
                                />
                            </Button>
                        </Tooltip>
                    </Link>
                </li>
            ) : (
                <li style={{ ...itemStyle, transform: 'translate(-50%, 100%)' }}>
                    <AuthToggle />
                </li>
            )}
        </ul>
    );
}

export default NavList;