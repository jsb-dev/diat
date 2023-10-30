import React from 'react';
import styles from '@/assets/scss/SignupSection.module.scss'
import { Card, CardContent, Typography } from '@mui/material';
import SignupButton from './SignupButton';

const ContentBanner: React.FC = () => {
    return (
        <Card className={styles.Card}>
            <CardContent className={styles.CardContent}>
                <Typography variant="h6" align="center" className={styles.Typography}>
                    Join Us
                </Typography>
                <SignupButton />
            </CardContent>
        </Card>
    );
};

export default ContentBanner;
