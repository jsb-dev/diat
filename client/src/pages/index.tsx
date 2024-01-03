import React, { useEffect } from 'react';
import Head from 'next/head';
import { Container, Divider } from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateLayout } from '@/redux/slices/uiSlice';
import PageShell from '@/components/shared/page-shell/PageShell';
import SignupSection from '@/components/page-components/root/SignupSection';
import AboutSection from '@/components/page-components/root/AboutSection';
import SiteFooter from '@/components/shared/SiteFooter';
import bgImage from '@/assets/images/raluca-seceleanu-huUwh7AOqb4-unsplash.jpg';

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
        console.error('There was an issue fetching from the backend:', error);
      }
    }

    fetchData();
  }, []);

  const main = (
    <Container component='main' className='main-content' sx={{
      backgroundImage: `url(${bgImage.src})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>
      <Container component='section' className='section-selector'>
        <Divider sx={{ marginTop: '1rem' }}
        />
        <SignupSection />
        <AboutSection />
      </Container>
      <Container component='div' className='footer-container'>
        <SiteFooter />
      </Container>
    </Container >
  );

  return (
    <>
      <Head>
        <title>Diat</title>
        <meta name="description" content="A drag-and-drop diagram editor with rich text functionality and ease of use." />
        <meta name="keywords" content="Diat, portfolio, web developer, full-stack, full stack, fullstack, web, developer, programmer, coding, coding portfolio, portfolio website, website, web developer portfolio, web developer portfolio website, web developer portfolio" />
      </Head>
      <PageShell content={main} page={'/'} />
    </>
  );
}

export default RootPage;
