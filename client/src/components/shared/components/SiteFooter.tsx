import React from 'react';
import { Container, Grid, Typography, Link } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const SiteFooter: React.FC = () => {
    const { viewportIsPortable, viewportIsVertical } = useSelector((state: RootState) => state.ui);
    const gridSize = (viewportIsPortable || viewportIsVertical) ? 6 : 3;

    const divContainer = {
        display: 'flex',
        flexDirection: 'column',
        padding: '1rem',
    };

    const gridItemStyle = {
        padding: '1rem',
    };

    return (
        <Container className='footer-selector' component='footer' sx={{
            minHeight: '30vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            borderTopLeftRadius: '1rem',
            borderTopRightRadius: '1rem',
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
        }}>
            <Grid container spacing={3}>
                <Grid item xs={gridSize} sx={gridItemStyle}>
                    <Typography variant="h6" className='footer-h6-selector'>
                        Contact
                    </Typography>
                    <Container component="div" sx={divContainer}>
                        <Link href="/about" color="inherit" className='footer-a-selector'>
                            Help
                        </Link>
                        <Link href="/contact" color="inherit" className='footer-a-selector'>
                            Developer
                        </Link>
                    </Container>
                </Grid>
                <Grid item xs={gridSize} sx={gridItemStyle}>
                    <Typography variant="h6" className='footer-h6-selector'>
                        Terms & Conditions
                    </Typography>
                    <Container component="div" sx={divContainer}>
                        <Link href="/terms" color="inherit" className='footer-a-selector'>
                            EULA
                        </Link>
                    </Container>
                </Grid>
                <Grid item xs={gridSize} sx={gridItemStyle}>
                    <Typography variant="h6" className='footer-h6-selector'>
                        Connect
                    </Typography>
                    <Container component="div" sx={divContainer}>
                        <Link href="mailto:info@example.com" color="inherit" className='footer-a-selector'>
                            Email
                        </Link>
                        <Link href="github.com" color="inherit" className='footer-a-selector'>
                            GitHub
                        </Link>
                        <Link href="linkedin.com" color="inherit" className='footer-a-selector'>
                            LinkedIn
                        </Link>
                    </Container>
                </Grid>
                <Grid item xs={gridSize} sx={gridItemStyle}>
                    <Typography variant="h6" className='footer-h6-selector'>
                        Portfolio Project
                    </Typography>
                    <Container component="div" sx={divContainer}>
                        <Typography variant="body2" className='footer-p-selector'>
                            2023 Diat
                        </Typography>
                    </Container>
                </Grid>
            </Grid>
        </Container>
    );
};

export default SiteFooter;
