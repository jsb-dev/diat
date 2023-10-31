import React from 'react';
import { Container, Grid, Typography } from '@mui/material';

const pSelector = 'p-selector';

const AboutSection: React.FC = () => {
    return (
        <Container className='section-selector'>
            <Grid container justifyContent="center">
                <Grid item>
                    <article>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant="body1" className={pSelector}>
                                    Content 1
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body1" className={pSelector}>
                                    Content 2
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body1" className={pSelector}>
                                    Content 3
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body1" className={pSelector}>
                                    Content 4
                                </Typography>
                            </Grid>
                        </Grid>
                    </article>
                </Grid>
            </Grid>
        </Container>
    );
};

export default AboutSection;
