import React from 'react';
import { Container, Grid, Typography, Link, Box } from '@mui/material';

const h6Selector = 'h6-selector';
const aSelector = 'a-selector';

const SiteFooter: React.FC = () => {
    return (
        <Box className='footer-selector'>
            <Container className='section-selector'>
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        <Typography variant="h6" className={h6Selector}>
                            Quick Links
                        </Typography>
                        <Link href="/about" color="inherit" className={aSelector}>
                            About
                        </Link>
                        <Link href="/contact" color="inherit" className={aSelector}>
                            Contact
                        </Link>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="h6" className={h6Selector}>
                            Legal
                        </Typography>
                        <Link href="/terms" color="inherit" className={aSelector}>
                            Terms & Conditions
                        </Link>
                        <Link href="/privacy" color="inherit" className={aSelector}>
                            Privacy Policy
                        </Link>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="h6" className={h6Selector}>
                            Connect
                        </Typography>
                        <Link href="mailto:info@example.com" color="inherit" className={aSelector}>
                            Email
                        </Link>
                        <Link href="tel:+1234567890" color="inherit" className={aSelector}>
                            Phone
                        </Link>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="h6" className={h6Selector}>
                            Copyright
                        </Typography>
                        <Typography variant="body2" className='p-selector'>
                            © 2023 Your Company. All Rights Reserved.
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default SiteFooter;
