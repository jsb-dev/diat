import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Link from 'next/link';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;

function Root() {
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${BACKEND_URL}/connect`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data.message);
      } catch (error) {
        console.error("There was an issue fetching from the backend:", error);
      }
    }

    fetchData();
  }, []);

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
