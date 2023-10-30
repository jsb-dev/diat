import React from 'react';
import { Container, Grid, Typography, Link } from '@mui/material';

const SiteFooter: React.FC = () => {
    return (
        <footer>
            <Container>
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        <Typography variant="h6">Quick Links</Typography>
                        <Link href="/about" color="inherit">
                            About
                        </Link>
                        <Link href="/contact" color="inherit">
                            Contact
                        </Link>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="h6">Legal</Typography>
                        <Link href="/terms" color="inherit">
                            Terms & Conditions
                        </Link>
                        <Link href="/privacy" color="inherit">
                            Privacy Policy
                        </Link>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="h6">Connect</Typography>
                        <Link href="mailto:info@example.com" color="inherit">
                            Email
                        </Link>
                        <Link href="tel:+1234567890" color="inherit">
                            Phone
                        </Link>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="h6">Copyright</Typography>
                        <Typography variant="body2">
                            © 2023 Your Company. All Rights Reserved.
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </footer>
    );
};

export default SiteFooter;
