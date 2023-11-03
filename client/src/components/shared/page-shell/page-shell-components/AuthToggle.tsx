import React from "react";
import { Button } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from 'react-redux';
import { clearAuthState } from '@redux/slices/authSlice';
import { clearDiagram } from '@redux/slices/flowSlice';
import { clearUser } from '@redux/slices/userSlice';

const AuthToggle: React.FC = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const dispatch = useDispatch();

  const buttonStyles = {
    position: 'fixed',
    top: '10dvh',
    right: '1rem',
    zIndex: 1005,
  };

  const handleLogout = () => {
    dispatch(clearAuthState());
    dispatch(clearDiagram());
    dispatch(clearUser());
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  if (isAuthenticated) {
    return (
      <Button onClick={handleLogout} className='quarternary-btn' sx={buttonStyles}>
        Log Out
      </Button>
    );
  } else {
    return <Button onClick={() => loginWithRedirect()} className='primary-btn' sx={buttonStyles}>Log In</Button>;
  }
};

export default AuthToggle;
