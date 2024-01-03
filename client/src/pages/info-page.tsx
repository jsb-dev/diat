import React, { useEffect } from 'react';
import Head from 'next/head';
import { Container, Divider, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateLayout } from '@/redux/slices/uiSlice';
import PageShell from '@/components/shared/page-shell/PageShell';
import SiteFooter from '@/components/shared/SiteFooter';
import infoContent from '@/assets/data/InfoContent.json';
import bgImage from '@/assets/images/ux-store-jJT2r2n7lYA-unsplash.jpg';

type ItemType = {
  type: string;
  content: string | string[];
};

type SectionType = {
  sections: ItemType[];
};

const ulStyles = {
  padding: '3rem 5rem',
  listStyleType: 'disc',
};

function InfoPage() {
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


  const renderSection = (section: SectionType) => (
    section.sections.map((item: ItemType, index: number) => {
      switch (item.type) {
        case 'heading':
          return <Typography key={index} variant='h3' component='h3' className='h3-selector'>{item.content}</Typography>;
        case 'subheading':
          return <Typography key={index} variant='h4' component='h4' className='h4-selector'>{item.content}</Typography>;
        case 'paragraph':
          return <Typography key={index} variant='body1' className='p-selector'>{item.content}</Typography>;
        case 'list':
          if (Array.isArray(item.content)) {
            return (
              <ul key={index} style={ulStyles}>
                {item.content.map((listItem, listItemIndex) => (
                  <li key={listItemIndex} >
                    <Typography variant='body1' className='p-selector'>{listItem}</Typography>
                  </li>
                ))}
              </ul>
            );
          }
          break;
        default:
          return <Typography key={index} variant='body1' className='p-selector'>{item.content}</Typography>;
      }
    })
  );

  const main = (
    <Container component='main' className='main-content' sx={{
      backgroundImage: `url(${bgImage.src})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>
      <Container component='section' className='section-selector'>
        <Typography variant='h1' className='h1-selector'>
          Info
        </Typography>
        <Divider />
        <Container component='section' className='section-selector'>
          {renderSection(infoContent.infoSection)}
        </Container>
        <Divider />
      </Container>
      <SiteFooter />
    </Container>
  );

  return (<>
    <Head>
      <title>JSB-DEV | Info</title>
      <meta name="description" content="A drag-and-drop diagram editor with rich text functionality and ease of use." />
      <meta name="keywords" content="JSB-DEV, JSB, DEV, portfolio, web developer, full-stack, full stack, fullstack, web, developer, programmer, coding, coding portfolio, portfolio website, website, web developer portfolio, web developer portfolio website, web developer portfolio" />
    </Head>
    <PageShell content={main} page={'/info-page'} />
  </>);
}

export default InfoPage;
