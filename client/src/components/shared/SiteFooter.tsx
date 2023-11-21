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
        padding: '3rem 0'
    };

    const footerContainerStyles = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        minWidth: '90dvw',
        maxWidth: '50rem',
    }

    return (
        <Container className='footer-selector' component='footer' sx={footerContainerStyles}>
            <Grid container spacing={3}>
                <Grid item xs={gridSize} >
                    <Container component='div' sx={divContainer}>
                        <Typography variant='h6' className='footer-h6-selector'>
                            Contact
                        </Typography>
                        <Link href='/about' color='inherit' className='footer-a-selector'>
                            Help
                        </Link>
                        <Link href='/contact' color='inherit' className='footer-a-selector'>
                            Developer
                        </Link>
                    </Container>
                </Grid>
                <Grid item xs={gridSize} >
                    <Container component='div' sx={divContainer}>
                        <Typography variant='h6' className='footer-h6-selector'>
                            Terms & Conditions
                        </Typography>
                        <Link href='/terms' color='inherit' className='footer-a-selector'>
                            EULA
                        </Link>
                    </Container>
                </Grid>
                <Grid item xs={gridSize} >
                    <Container component='div' sx={divContainer}>
                        <Typography variant='h6' className='footer-h6-selector'>
                            Connect
                        </Typography>
                        <Link href='mailto:info@example.com' color='inherit' className='footer-a-selector'>
                            Email
                        </Link>
                        <Link href='github.com' color='inherit' className='footer-a-selector'>
                            GitHub
                        </Link>
                        <Link href='linkedin.com' color='inherit' className='footer-a-selector'>
                            LinkedIn
                        </Link>
                    </Container>
                </Grid>
                <Grid item xs={gridSize} >
                    <Container component='div' sx={divContainer}>
                        <Typography variant='h6' className='footer-h6-selector'>
                            Portfolio Project
                        </Typography>
                        <Typography variant='body2' className='footer-p-selector'>
                            2023 Diat
                        </Typography>
                    </Container>
                </Grid>
            </Grid>
        </Container>
    );
};

export default SiteFooter;
