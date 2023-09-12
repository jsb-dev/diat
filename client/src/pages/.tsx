import React, { useEffect } from "react";
import PageShell from "@/components/shared/page-shell/PageShell";

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
    <PageShell content={<h1>Root</h1>} page={'/'} />
  );
}

export default Root;
