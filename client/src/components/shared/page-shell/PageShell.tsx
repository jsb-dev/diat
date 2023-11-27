import React, { FC, ReactNode, useState, useEffect, CSSProperties } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { setAppInitialised, setIsLoading } from '@/redux/slices/uiSlice';
import { Container, Paper, Button, Box } from '@mui/material';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import NavList from './page-shell-components/NavList';
import DiagramEditor from './page-shell-components/DiagramEditor';
import AuthToggle from '@/components/shared/page-shell/page-shell-components/AuthToggle';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

interface PageShellProps {
  content: ReactNode;
  page: string;
}

const btnStyle: CSSProperties = {
  position: 'fixed',
  zIndex: 1005,
};

const menuBtnStyle: CSSProperties = {
  ...btnStyle,
  bottom: '10dvh',
  right: '.4dvw',
}

const editBtnStyle: CSSProperties = {
  ...btnStyle,
  bottom: '45dvh',
  right: '.4dvw',
};

const elevatedStyle: CSSProperties = {
  position: 'fixed',
  zIndex: 1005,
};

const PageShell: FC<PageShellProps> = ({ content, page }) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isDiagramDrawerOpen, setDiagramDrawerOpen] = useState(false);
  const isLoading = useSelector((state: RootState) => state.ui.isLoading);
  const appInitialised = useSelector(
    (state: RootState) => state.ui.appInitialised
  );
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (isLoading && !appInitialised) {
      const timer = setTimeout(() => {
        dispatch(setIsLoading());
        dispatch(setAppInitialised());
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [appInitialised, dispatch, isLoading]);

  if (isLoading) {
    return (
      <Container className='main-container' sx={{
        overflowX: 'hidden',
        overflowY: 'hidden',
        width: '100dvw',
        height: '100dvh',
      }}>
        <LoadingSpinner />
      </Container>
    );
  }

  const toggleDrawer = () => {
    setDrawerOpen(prev => !prev);
  };

  const toggleDiagramDrawer = () => {
    setDiagramDrawerOpen(prev => !prev);
  };

  return (
    <Container className='main-container' sx={{
      overflowX: 'hidden',
      overflowY: page === '/dashboard-page' ? 'hidden' : 'auto',
    }}>
      <Paper>
        {content}
      </Paper>
      <div style={{
        ...elevatedStyle,
        top: '10dvh',
        right: '.5dvw',
      }}>
        <AuthToggle />
      </div>


      {/* ////////// Nav Menu ////////// */}
      {!isDrawerOpen ? (
        <Button onClick={toggleDrawer} sx={menuBtnStyle} className='primary-btn'>
          <MenuRoundedIcon sx={{
            fontSize: '3rem'
          }} />
        </Button>
      ) : (
        <div style={elevatedStyle}>
          <Button onClick={toggleDrawer} sx={menuBtnStyle} className='primary-btn'>
            <CloseOutlinedIcon sx={{
              fontSize: '3rem'
            }} />
          </Button>
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
        </div>
      )}

      {/* ////////// Diagram Editor ////////// */}
      {!isDiagramDrawerOpen ? (
        page === '/dashboard-page' && (
          <Button onClick={toggleDiagramDrawer} sx={editBtnStyle} className='ternary-btn'>
            <ModeEditOutlinedIcon sx={{
              fontSize: '3rem'
            }} />
          </Button>
        )

      ) : (
        <>
          <Button onClick={toggleDiagramDrawer} sx={editBtnStyle} className='ternary-btn'>
            <CloseOutlinedIcon sx={{
              fontSize: '3rem'
            }} />
          </Button>
          <Box onClick={toggleDiagramDrawer} ></Box>
          <Box sx={{
            zIndex: 1002,
            opacity: isDiagramDrawerOpen ? 1 : 0,
          }}>
            <DiagramEditor />
          </Box>
        </>
      )}

      {/* ////////// Dashboard Btn ////////// */}
      {(page !== '/dashboard-page' && user.authState.isAuthenticated) &&
        (<div style={{
          ...elevatedStyle,
          left: '.5dvw',
          bottom: '10dvh',
        }}>
          <Button onClick={
            () => {
              router.push('/dashboard-page');
            }
          } className='ternary-btn'>
            Dashboard
          </Button>
        </div>
        )}
    </Container>
  );
}

export default PageShell;
