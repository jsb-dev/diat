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

  const handleLogout = () => {
    dispatch(clearAuthState());
    dispatch(clearDiagram());
    dispatch(clearUser());
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  if (isAuthenticated) {
    return (
      <Button onClick={handleLogout} className='quarternary-btn' >
        Log Out
      </Button>
    );
  } else {
    return <Button onClick={() => loginWithRedirect()} className='secondary-btn' >Log In</Button>;
  }
};

export default AuthToggle;
