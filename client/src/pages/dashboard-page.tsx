import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      Log Out
    </button>
  );
};

function DashboardPage() {
    return (
      <div>
        <h1>Dashboard</h1>
        <p>This is the Dashboard.</p>
        <LogoutButton />
      </div>
    );
  }
  
export default DashboardPage;