import { Button } from '@mui/material';
import Link from 'next/link';

const NavList: React.FC = () => {
    return (
        <ul style={{ listStyleType: 'none', position: 'absolute', bottom: '13rem', right: '18rem' }}>
            <li style={listItemStyle}>
                <Link href="/" passHref >
                    <Button style={buttonStyle}>Home</Button>
                </Link>
            </li>
            <li style={{ ...listItemStyle, transform: 'translate(50%, 50%)' }}>
                <Link href="/option1" passHref >
                    <Button style={buttonStyle}>1</Button>
                </Link>
            </li>
            <li style={{ ...listItemStyle, transform: 'translateY(100%)' }}>
                <Link href="/option2" passHref >
                    <Button style={buttonStyle}>2</Button>
                </Link>
            </li>
            <li style={{ ...listItemStyle, transform: 'translate(-50%, 50%)' }}>
                <Link href="/option3" passHref >
                    <Button style={buttonStyle}>3</Button>
                </Link>
            </li>
        </ul>
    );
}

const listItemStyle: React.CSSProperties = {
    position: 'absolute',
    width: '15rem',
    height: '15rem',
};

const navLinkStyle: React.CSSProperties = {
    textDecoration: 'none',
    color: '#fff',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.2rem',
    transition: 'all 0.2s ease-in-out',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '1rem',
    width: '6rem',
    height: '6rem',
    position: 'absolute',
    top: '50%',
    left: '50%',
    backgroundColor: '#c37ee0',
    cursor: 'pointer'
};

const buttonStyle: React.CSSProperties = {
    ...navLinkStyle,
};

export default NavList;