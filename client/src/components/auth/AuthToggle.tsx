import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from 'react-redux';
import { clearAuthState } from '../../redux/slices/authSlice';
import { clearDiagram } from '../../redux/slices/diagramSlice';
import { clearUser } from '../../redux/slices/userSlice';

const AuthToggle: React.FC = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Step 1: Clear state in Redux
    dispatch(clearAuthState());
    dispatch(clearDiagram());
    dispatch(clearUser());
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  if (isAuthenticated) {
    return (
      <button onClick={handleLogout}>
        Log Out
      </button>
    );
  } else {
    return <button onClick={() => loginWithRedirect()}>Log In</button>;
  }
};

export default AuthToggle;
