import React from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent, Typography, Box } from '@mui/material';
import SignupButton from './SignupButton';
import { RootState } from '@/redux/store';

const commonStyles = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
};

const cardStyles = {
    width: '100%',
    padding: '1rem',
    flexDirection: 'column',
}

const styles = {
    CommonStyles: {
        ...commonStyles,
    },
    Card: {
        ...commonStyles,
        ...cardStyles,
        height: '80dvh',
    },
    PortableCard: {
        ...cardStyles,
        height: '60dvh',
    }
};

const ContentBanner: React.FC = () => {
    const { viewportIsVertical, viewportIsPortable } = useSelector((state: RootState) => state.ui);
    const portableDevice = viewportIsVertical || viewportIsPortable;

    return (
        <Card className='primary-container' sx={{
            ...styles.Card,
            ...(portableDevice && styles.PortableCard),
        }}>
            <Box sx={commonStyles}>
                LOGO HERE
            </Box>
            <CardContent sx={commonStyles}>
                <Typography variant="h6" align="center" sx={commonStyles}>
                    Join Us
                </Typography>
                <SignupButton />
                <Box sx={commonStyles}>
                    EULA HERE
                </Box>
            </CardContent>
        </Card>
    );
};

export default ContentBanner;
