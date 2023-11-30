import React, { useEffect } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateLayout } from '@/redux/slices/uiSlice';
import ContentBanner from '@/components/page-components/root/ContentBanner';
import contentData from '@/assets/data/RootContent.json';
import { RootState } from '@/redux/store';

const gridContainerStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0',
    padding: '0',
};

type Section = {
    type: string;
    content: string;
};

const SignupSection: React.FC = () => {

    const chunkArrayInPairs = (array: Section[]): Section[][] => {
        return array.reduce((result: Section[][], value: Section, index: number, array: Section[]) => {
            if (index % 2 === 0) {
                result.push(array.slice(index, index + 2));
            }
            return result;
        }, []);
    };

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
        <Grid container spacing={1} direction={gridDirection} sx={gridContainerStyles}>
            <Grid item xs={12} md={6} sx={{
                overflowY: viewportIsPortable || viewportIsVertical ? 'hidden' : 'scroll',
                height: viewportIsPortable || viewportIsVertical ? '58dvh' : '78dvh',
                backgroundColor: !viewportIsPortable ? 'rgba(0,0,0,0.6)' : 'transparent',
                padding: '0',
            }}>
                <Typography component='article'>
                    <Typography variant='h1' className='h1-selector'>
                        {contentData.signupSection.title}
                    </Typography>
                    {chunkArrayInPairs(contentData.signupSection.sections).map((pair, pairIndex) => (
                        <Typography variant='body1' className='p-selector' key={pairIndex} sx={{
                        }}>
                            {pair.map((section: Section, index: number) => (
                                <React.Fragment key={index}>
                                    {renderContent(section.type, section.content)}
                                </React.Fragment>
                            ))}
                        </Typography>
                    ))}
                </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
                <ContentBanner />
            </Grid>
        </Grid >
    );
}

export default SignupSection;
