import React, { CSSProperties } from 'react';
import { Button } from '@mui/material';
import Link from 'next/link';

const listStyle: CSSProperties = {
    listStyleType: 'none',
    position: 'fixed',
    bottom: '27rem',
    right: '25rem'
};

const itemStyle: CSSProperties = {
    position: 'fixed',
    cursor: 'pointer',
};

const NavList: React.FC = () => {
    return (
        <ul style={listStyle}>
            <li style={itemStyle}>
                <Link href="/" passHref >
                    <Button className='secondary-btn'>Home</Button>
                </Link>
            </li>
            <li style={{ ...itemStyle, transform: 'translate(75%, 125%)' }}>
                <Link href="/option1" passHref >
                    <Button className='secondary-btn'>1</Button>
                </Link>
            </li>
            <li style={{ ...itemStyle, transform: 'translateY(250%)' }}>
                <Link href="/option2" passHref >
                    <Button className='secondary-btn'>2</Button>
                </Link>
            </li>
            <li style={{ ...itemStyle, transform: 'translate(-75%, 125%)' }}>
                <Link href="/option3" passHref >
                    <Button className='secondary-btn'>3</Button>
                </Link>
            </li>
        </ul>
    );
}

export default NavList;