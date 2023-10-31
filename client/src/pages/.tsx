import React, { useEffect } from "react";
import { Container } from "@mui/material";
import PageShell from "@/components/shared/page-shell/PageShell";
import SignupSection from "@/components/page-components/root/sections/SignupSection";
import AboutSection from "@/components/page-components/root/sections/AboutSection";
import SiteFooter from "@/components/shared/SiteFooter";

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
        console.log('Server Response', data.message);
      } catch (error) {
        console.error("There was an issue fetching from the backend:", error);
      }
    }

    fetchData();
  }, []);

  const main = (
    <Container component="main" className='primary-section'>
      <SignupSection />
      <AboutSection />
      <SiteFooter />
    </Container>
  );

  return <PageShell content={main} page={'/'} />;
}

export default Root;
