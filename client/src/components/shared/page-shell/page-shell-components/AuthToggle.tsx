import React from 'react';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch } from 'react-redux';
import { clearAuthState } from '@redux/slices/authSlice';
import { clearDiagram } from '@redux/slices/flowSlice';
import { clearUser } from '@redux/slices/userSlice';
import Tooltip from '@mui/material/Tooltip';

const AuthToggle: React.FC = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(clearAuthState());
    dispatch(clearDiagram());
    dispatch(clearUser());
    router.replace('/');
    logout();
  }

  return (
    <Tooltip title={isAuthenticated ? "Logout" : "Login"}>
      <Button onClick={isAuthenticated ? handleLogout : () => loginWithRedirect()} className={isAuthenticated ? 'quarternary-btn' : 'primary-btn'}>
        {isAuthenticated ? <LogoutIcon sx={{ fontSize: '3rem' }} /> : <LoginIcon sx={{ fontSize: '3rem' }} />}
      </Button>
    </Tooltip>
  );
};

export default AuthToggle;
