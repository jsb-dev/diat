import React, { FC, ReactNode, useState, CSSProperties } from 'react';
import { Container, Paper, Button, Box } from '@mui/material';
import NavList from './page-shell-components/NavList';
import DiagramEditor from './page-shell-components/DiagramEditor';
import AuthToggle from '@/components/shared/page-shell/page-shell-components/AuthToggle';

interface PageShellProps {
  content: ReactNode;
  page: string;
}

const btnStyle: CSSProperties = {
  position: 'fixed',
  zIndex: 1003
};

const menuBtnStyle: CSSProperties = {
  ...btnStyle,
  bottom: '10dvh',
  right: '1dvw',
}

const editBtnStyle: CSSProperties = {
  ...btnStyle,
  bottom: '45dvh',
  right: '1dvw',
};

const PageShell: FC<PageShellProps> = ({ content, page }) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isDiagramDrawerOpen, setDiagramDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(prev => !prev);
  };

  const toggleDiagramDrawer = () => {
    setDiagramDrawerOpen(prev => !prev);
  };

  return (
    <Container
      component="menu"
      className='ui-container'
    >
      <div style={{
        position: 'fixed',
        zIndex: 1005,
        top: '10dvh',
        right: '1dvw',
      }}>
        <AuthToggle />
      </div>
      <Paper className='main-container' elevation={3}>
        {content}
      </Paper>

      {/* ////////// Nav Menu ////////// */}
      {!isDrawerOpen ? (
        <Button onClick={toggleDrawer} sx={menuBtnStyle} className='primary-btn'>Menu</Button>
      ) : (
        <>
          <Button onClick={toggleDrawer} sx={menuBtnStyle} className='primary-btn'>Close Menu</Button>
          <Box onClick={toggleDrawer}></Box>
          <Box sx={{
            zIndex: 1002,
            opacity: isDrawerOpen ? 1 : 0,
          }}>
            <div style={{
              position: 'fixed',
              bottom: 0,
              right: 0,
              width: '30rem',
              maxWidth: '250px',
              height: '32rem',
              maxHeight: '250px',
            }}>
              <NavList />
            </div>
          </Box>
        </>
      )}

      {/* ////////// Diagram Editor ////////// */}
      {!isDiagramDrawerOpen ? (
        page === '/dashboard-page' && (
          <Button onClick={toggleDiagramDrawer} sx={editBtnStyle} className='tertiary-btn'>Editor</Button>
        )

      ) : (
        <>
          <Button onClick={toggleDiagramDrawer} sx={editBtnStyle} className='tertiary-btn'>Close Editor</Button>
          <Box onClick={toggleDiagramDrawer} ></Box>
          <Box sx={{
            zIndex: 1002,
            opacity: isDiagramDrawerOpen ? 1 : 0,
          }}>
            <DiagramEditor />
          </Box>
        </>
      )}
    </Container>
  );
}

export default PageShell;
