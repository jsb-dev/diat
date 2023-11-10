import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Container, Grid, Typography, Box } from '@mui/material';
import contentData from '@/assets/data/RootContent.json';

const AboutSection: React.FC = () => {
    const { viewportIsPortable, viewportIsVertical } = useSelector((state: RootState) => state.ui);

    return (
        <Container component="section" className='section-selector' sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: viewportIsPortable || viewportIsVertical ? '7dvh' : '1dvh',
        }}>
            <Box sx={{ width: '100%' }}>
                <Typography variant='h1' className='h1-selector' align='center'>
                    {contentData.aboutSection.title}
                </Typography>
                <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
                    {contentData.aboutSection.contentParagraphs.map((paragraph, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                            <Typography variant='body1' className='p-selector'>
                                {paragraph}
                            </Typography>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
}

export default AboutSection;
