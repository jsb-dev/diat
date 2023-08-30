import React from "react";
import { Button } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from 'react-redux';
import { clearAuthState } from '../../redux/slices/authSlice';
import { clearDiagram } from '../../redux/slices/diagramSlice';
import { clearUser } from '../../redux/slices/userSlice';

const AuthToggle: React.FC = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearAuthState());
    dispatch(clearDiagram());
    dispatch(clearUser());
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  if (isAuthenticated) {
    return (
      <Button onClick={handleLogout} style={{
        position: 'absolute',
        top: '2vh',
        left: '2vw',
        padding: 0,
        margin: 0,
        zIndex: 1005,
        width: '8rem',
        height: '8rem',
        borderRadius: '1rem',
        opacity: 0.8,
        transition: 'all .1s ease-in-out',
        boxShadow: '0 .5rem 7rem 1rem rgba(0, 0, 0, .7), 0 .5rem 1.8rem 1.5rem rgba(0, 0, 0, 0.5)',
      }}>
        Log Out
      </Button>
    );
  } else {
    return <Button onClick={() => loginWithRedirect()} style={{
      position: 'absolute',
      top: '2vh',
      left: '2vw',
      padding: 0,
      margin: 0,
      zIndex: 1005,
      width: '8rem',
      height: '8rem',
      borderRadius: '1rem',
      opacity: 0.8,
      transition: 'all .1s ease-in-out',
      boxShadow: '0 .5rem 7rem 1rem rgba(0, 0, 0, .7), 0 .5rem 1.8rem 1.5rem rgba(0, 0, 0, 0.5)',
    }}>Log In</Button>;
  }
};

export default AuthToggle;
