import React from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import contentData from '@/assets/data/RootContent.json';

const AboutSection: React.FC = () => {

    return (
        <Container component="section" className='section-selector'>
            <Box>
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
