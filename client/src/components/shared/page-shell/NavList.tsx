import { Button } from '@mui/material';
import Link from 'next/link';

const NavList: React.FC = () => {
    return (
        <ul style={{ listStyleType: 'none', position: 'absolute', bottom: '13rem', right: '18rem', padding: 0, margin: 0 }}>
            <li style={listItemStyle}>
                <Link href="/" passHref>
                    <Button style={buttonStyle}>Home</Button>
                </Link>
            </li>
            <li style={{ ...listItemStyle, transform: 'translate(50%, 50%)' }}>
                <Link href="/info/html" passHref>
                    <Button style={buttonStyle}>HTML</Button>
                </Link>
            </li>
            <li style={{ ...listItemStyle, transform: 'translateY(100%)' }}>
                <Link href="/info/css" passHref>
                    <Button style={buttonStyle}>CSS</Button>
                </Link>
            </li>
            <li style={{ ...listItemStyle, transform: 'translate(-50%, 50%)' }}>
                <Link href="/info/js" passHref>
                    <Button style={buttonStyle}>JS</Button>
                </Link>
            </li>
        </ul>
    );
}

const listItemStyle: React.CSSProperties = {
    position: 'absolute',
    width: '15rem',
    height: '15rem',
    transformOrigin: '50% 50%',
};

const navLinkStyle: React.CSSProperties = {
    textDecoration: 'none',
    color: '#fff',
    fontSize: 'max(.8rem, 8pt)',
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
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#c37ee0',
    cursor: 'pointer'
};

const buttonStyle: React.CSSProperties = {
    ...navLinkStyle,
    textDecoration: undefined,
    position: undefined,
    top: undefined,
    left: undefined,
    transform: undefined
};

export default NavList;