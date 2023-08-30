import React, { FC, ReactNode } from 'react';
import { Container, CssBaseline, Paper, ThemeProvider, createTheme } from '@mui/material';

interface PageShellProps {
  content: ReactNode;
}

const theme = createTheme({
  // theme options
});

const PageShell: FC<PageShellProps> = ({ content }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
        }}
      >
        <Paper elevation={3} sx={{ p: '2rem', width: '94vw', height: '94vh'}}>
          {content}
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default PageShell;