import React, { useEffect } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateLayout } from '@/redux/slices/uiSlice';
import ContentBanner from '../../../shared/components/ContentBanner';
import contentData from '@/assets/data/SignupSection.json';
import { RootState } from '@/redux/store';

const SignupSection: React.FC = () => {

    const renderContent = (type: string, content: string) => {
        switch (type) {
            case 'intro':
                return <Typography variant='h2' className='h2-selector'>{content}</Typography>;
            case 'title':
                return <Typography variant='h1' className='h1-selector'>{content}</Typography>;
            case 'subheading':
                return <Typography variant='h3' className='h3-selector'>{content}</Typography>;
            case 'paragraph':
                return <Typography variant='body1' className='p-selector'>{content}</Typography>;
            default:
                return null;
        }
    };

    const dispatch = useDispatch();
    const { viewportIsVertical, viewportIsPortable } = useSelector((state: RootState) => state.ui);

    useEffect(() => {
        const handleResize = () => {
            dispatch(updateLayout({ innerWidth: window.innerWidth, innerHeight: window.innerHeight }));
        };

        handleResize();

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [dispatch]);

    const gridDirection = (viewportIsVertical || viewportIsPortable) ? 'column-reverse' : 'row';

    return (
        <Container component="section" className='section-selector'>
            <Grid container spacing={2} direction={gridDirection}>
                <Grid item xs={12} md={6}>
                    <div>
                        <Typography variant='h1' className='h1-selector'>
                            {contentData.signupSection.title}
                        </Typography>
                        {contentData.signupSection.sections.map((section, index) => (
                            <div className='article-div' key={index}>
                                {renderContent(section.type, section.content)}
                            </div>
                        ))}
                    </div>
                </Grid>
                <Grid item xs={12} md={6}>
                    <ContentBanner />
                </Grid>
            </Grid>
        </Container>
    );
}

export default SignupSection;
