import React, { useEffect } from "react";
import { Container } from "@mui/material";
import { useDispatch } from "react-redux";
import { updateLayout } from "@/redux/slices/uiSlice";
import PageShell from "@/components/shared/page-shell/PageShell";
import SignupSection from "@/components/page-components/root/SignupSection";
import AboutSection from "@/components/page-components/root/AboutSection";
import SiteFooter from "@/components/shared/SiteFooter";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;

function RootPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      dispatch(updateLayout({ innerWidth: window.innerWidth, innerHeight: window.innerHeight }));
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dispatch]);

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
    <Container component="main" className='primary-section' >
      <SignupSection />
      <AboutSection />
      <SiteFooter />
    </Container >
  );

  return <PageShell content={main} page={'/'} />;
}

export default RootPage;
