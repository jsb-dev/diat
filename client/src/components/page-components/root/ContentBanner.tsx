import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Image from 'next/image';
import { Card, CardContent, Typography, Box, Divider } from '@mui/material';
import SignupButton from '../../shared/SignupButton';
import logo from '@/assets/images/diat_logo.png';

const commonStyles = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    maxWidth: '95%',
};

const cardStyles = {
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
        padding: '1rem',
    },
    PortableCard: {
        ...cardStyles,
        marginLeft: '2dvw',
        minHeight: '550px',
    },
    CardContent: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
};

const ContentBanner: React.FC = () => {
    const { viewportIsPortable, viewportIsVertical } = useSelector((state: RootState) => state.ui);
    return (
        <Card sx={{
            ...styles.Card,
            ...((viewportIsPortable && !viewportIsVertical) && styles.PortableCard),
            backgroundColor: 'transparent',
        }}>
            <Box sx={commonStyles}>
                <Typography variant='h1' sx={
                    commonStyles
                }>
                    <Image src={logo} alt='DIAT Logo' priority style={{
                        width: '80%',
                        height: 'auto',
                    }} />
                </Typography>
            </Box>
            <CardContent sx={{ ...commonStyles, ...((viewportIsPortable) && styles.CardContent) }}>
                <Typography variant='h4' align='center' className='h4-selector' sx={{ ...commonStyles, width: '100%', margin: viewportIsPortable ? '0 0 8dvh 0' : 0, padding: 0 }}>
                    Plan ahead
                    <Divider />
                    Plan along
                </Typography>
                <SignupButton />
            </CardContent>
            <Typography variant='h6' align='center' className='h6-selector' sx={commonStyles}>
                <Divider />
                EULA Link
                <Divider />
            </Typography>
        </Card>
    );
};

export default ContentBanner;
