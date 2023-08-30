import React, { FC, ReactNode, useState } from 'react';
import { Container, Paper, Button, Box } from '@mui/material';
import NavList from './NavList';
import AuthToggle from '@/components/auth/AuthToggle';

interface PageShellProps {
  content: ReactNode;
}

const PageShell: FC<PageShellProps> = ({ content }) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(prev => !prev);
  };

  return (
    <Container
      component="main"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
        overflowY: 'scroll',
        overflowX: 'hidden',
        margin: 0,
        padding: 0,
        position: 'relative',
      }}
    >
      <AuthToggle />
      <Paper elevation={3} sx={{ width: '94vw', height: '94vh', borderRadius: '1rem' }}>
        {content}
      </Paper>

      {!isDrawerOpen ? (
        <Button onClick={toggleDrawer} sx={{
          position: 'absolute', bottom: '2vh', right: '2vw', padding: 0, margin: 0,
          zIndex: 1005,
          width: '8rem',
          height: '8rem',
          borderRadius: '1rem',
          opacity: 0.8,
          transition: 'all .1s ease-in-out',
          boxShadow: '0 .5rem 7rem 1rem rgba(0, 0, 0, .7), 0 .5rem 1.8rem 1.5rem rgba(0, 0, 0, 0.5)',
        }}>Menu</Button>
      ) : (
        <>
          <Button onClick={toggleDrawer} sx={{
            position: 'absolute', bottom: '2vh', right: '2vw', padding: 0, margin: 0,
            zIndex: 1005,
            width: '8rem',
            height: '8rem',
            borderRadius: '1rem',
            opacity: 0.8,
            transition: 'all .1s ease-in-out',
            boxShadow: '0 .5rem 7rem 1rem rgba(0, 0, 0, .7), 0 .5rem 1.8rem 1.5rem rgba(0, 0, 0, 0.5)',
          }}>Close</Button>

          <Box onClick={toggleDrawer} sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            zIndex: 1000,
          }}></Box>

          <Box className="modal" sx={{
            position: 'absolute',
            bottom: '7rem',
            right: '1rem',
            zIndex: 1002,
            opacity: isDrawerOpen ? 1 : 0,
            transition: 'all .1s ease-in-out',
          }}>
            <Box className="modal" sx={{
              position: 'absolute',
              bottom: '13rem',
              right: '7rem',
              zIndex: 1002,
              opacity: isDrawerOpen ? 1 : 0,
              transition: 'all .1s ease-in-out',
            }}>
              <NavList />
            </Box>
          </Box>
        </>
      )}
    </Container>
  );
}

export default PageShell;
