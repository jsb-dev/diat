import React from 'react';
import { Container, Grid, Typography, Link } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

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

const SiteFooter: React.FC = () => {
    const { viewportIsPortable, viewportIsVertical } = useSelector((state: RootState) => state.ui);
    const gridSize = (viewportIsPortable || viewportIsVertical) ? 6 : 3;

    return (
        <Container className='footer-selector' component='footer' sx={footerContainerStyles}>
            <Grid container spacing={3}>
                <Grid item xs={gridSize} >
                    <Container component='div' sx={divContainer}>
                        <Typography variant='h6' className='footer-h6-selector'>
                            Contact
                        </Typography>
                        <Link href='/contact-page' target='_blank' className='footer-a-selector'>
                            Help
                        </Link>
                        <Link href='https://github.com/jsb-dev' target='_blank' className='footer-a-selector'>
                            Developer
                        </Link>
                    </Container>
                </Grid>
                <Grid item xs={gridSize} >
                    <Container component='div' sx={divContainer}>
                        <Typography variant='h6' className='footer-h6-selector'>
                            Connect
                        </Typography>
                        <Link href='mailto:jsb-dev@outlook.com' target='_blank' className='footer-a-selector'>
                            jsb-dev@outlook.com
                        </Link>
                        <Link href='https://github.com/jsb-dev/diat' target='_blank' className='footer-a-selector'>
                            GitHub
                        </Link>
                        <Link href='https://www.linkedin.com/in/jacob-booth-1a9390233/' target='_blank' className='footer-a-selector'>
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
                            {
                                new Date().getFullYear()
                            } Diat
                        </Typography>
                    </Container>
                </Grid>
                <Grid item xs={gridSize} >
                    <Container component='div' sx={divContainer}>
                        <Typography variant='h6' className='footer-h6-selector'>
                            Terms & Conditions
                        </Typography>
                        <Link href='https://www.gdprprivacynotice.com/live.php?token=zttlJJlfb14DkIjUNfn0DPBF9cLs6usX' target='_blank' className='footer-a-selector'>
                            Privacy Policy
                        </Link>
                    </Container>
                </Grid>
            </Grid>
        </Container>
    );
};

export default SiteFooter;
