import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Link from 'next/link';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

function Root() {
  return (
    <div>
      <h1>Welcome to My App!</h1>
      <p>This is the main page.</p>

      <Link href="/info-page">
        Go to Info Page
      </Link>
      <LoginButton />
    </div>
  );
}

export default Root;
