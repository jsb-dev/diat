import React, { useEffect } from "react";
import { Container, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { updateLayout } from "@/redux/slices/uiSlice";
import PageShell from "@/components/shared/page-shell/PageShell";
import SignupSection from "@/components/page-components/root/sections/SignupSection";
import AboutSection from "@/components/page-components/root/sections/AboutSection";
import SiteFooter from "@/components/shared/components/SiteFooter";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;

function RootPage() {
  const { viewportIsPortable, viewportIsVertical } = useSelector((state: RootState) => state.ui);
  const dispatch = useDispatch();

  const marginSize = viewportIsPortable || viewportIsVertical ? '3dvh' : '6dvh';

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
      <Divider sx={{
        marginTop: marginSize,
      }}>
      </Divider>
      <SignupSection />
      <Divider sx={{
        marginTop: marginSize,
      }}>
      </Divider>
      <AboutSection />
      <Divider sx={{
        marginTop: marginSize,
      }}>
      </Divider>
      <Divider sx={{
        marginTop: marginSize,
      }}>
      </Divider>
      <SiteFooter />
    </Container>
  );

  return <PageShell content={main} page={'/'} />;
}

export default RootPage;
