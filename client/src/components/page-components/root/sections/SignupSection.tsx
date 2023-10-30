import React from 'react';
import styles from '@/assets/scss/SignupSection.module.scss';
import { Container, Grid, Typography } from '@mui/material';
import ContentBanner from '../components/ContentBanner';

const SignupSection: React.FC = () => {
    return (
        <Container className={styles.Container}>
            <Grid container spacing={2} className={styles.Grid}>
                <Grid item xs={6}>
                    <Typography variant="h4" align="center" className={styles.Typography}>
                        Sign Up Now!
                    </Typography>
                    {/* Additional Content */}
                </Grid>
                <Grid item xs={6}>
                    <ContentBanner />
                </Grid>
            </Grid>
        </Container>
    );
};

export default SignupSection;
