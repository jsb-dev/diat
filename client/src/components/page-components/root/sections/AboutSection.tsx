import React from 'react';
import { Container, Grid, Typography } from '@mui/material';

const AboutSection: React.FC = () => {
    return (
        <Container>
            <Grid container justifyContent="center">
                <Grid item>
                    <article>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant="body1" component="p">
                                    Content 1
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body1" component="p">
                                    Content 2
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body1" component="p">
                                    Content 3
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body1" component="p">
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
