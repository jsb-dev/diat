import React, { CSSProperties } from 'react';
import { Button } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import Link from 'next/link';
import AuthToggle from '@/components/shared/page-shell/page-shell-components/AuthToggle';

const listStyle: CSSProperties = {
    position: 'fixed',
    right: '32.5rem',
    bottom: '30%',
};

const itemStyle: CSSProperties = {
    position: 'fixed',
    cursor: 'pointer',
};

const NavList: React.FC = () => {
    const { isAuthenticated } = useAuth0();

    return (
        <ul style={listStyle}>
            <li style={itemStyle}>
                <Link href="/" passHref >
                    <Button className='primary-btn'>Home</Button>
                </Link>
            </li>
            <li style={{ ...itemStyle, transform: 'translate(50%, 100%)' }}>
                <Link href="/info-page" passHref >
                    <Button className='primary-btn'>Info</Button>
                </Link>
            </li>
            <li style={{ ...itemStyle, transform: 'translateY(200%)' }}>
                <Link href="/contact-page" passHref >
                    <Button className='primary-btn'>Contact</Button>
                </Link>
            </li>
            {isAuthenticated ? (
                <li style={{ ...itemStyle, transform: 'translate(-50%, 100%)' }}>
                    <Link href="/account-page" passHref >
                        <Button className='primary-btn'>Account</Button>
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