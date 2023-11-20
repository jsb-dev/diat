import React from "react";
import { Button } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
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
        <LogoutIcon sx={{
          fontSize: '3rem'
        }} />
      </Button>
    );
  } else {
    return <Button onClick={() => loginWithRedirect()} className='secondary-btn' >
      <LoginIcon sx={{
        fontSize: '3rem'
      }} />
    </Button>;
  }
};

export default AuthToggle;
