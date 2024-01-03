import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Container, Divider, Box, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateLayout } from '@/redux/slices/uiSlice';
import PageShell from '@/components/shared/page-shell/PageShell';
import ContactForm from '@/components/shared/ContactForm';
import SiteFooter from '@/components/shared/SiteFooter';
import ErrorModal from '@/components/shared/ErrorModal';
import contactContent from '@/assets/data/ContactContent.json';
import bgImage from '@/assets/images/hanna-morris-_XXNjSziZuA-unsplash.jpg';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;

const sectionStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    margin: '1rem',
    padding: '1rem',
};

const dividerStyles = {
    margin: '2rem 0',
};


function ContactPage() {
    const [userEmail, setUserEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [messageSent, setMessageSent] = useState(false);

    const handleCloseModal = () => {
        setErrorMessage(null);
    };

    const dispatch = useDispatch();

    const handleSubmitMsg = async () => {
        if (!userEmail || !subject || !message) {
            console.error('All fields are required.');
            setErrorMessage('All fields are required.');
            return;
        } else if (!userEmail.includes('@') || !userEmail.includes('.')) {
            console.error('Invalid email.');
            setErrorMessage('Invalid email.');
            return;
        }

        try {
            const response = await fetch(`${BACKEND_URL}/contact/enquiry`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userEmail, subject, message }),
            });

            if (!response.ok) {
                console.error('Error submitting form:', response.status);
                setErrorMessage(`Error: ${response.status}`);
                return;
            } else if (response.status === 200) {
                console.log('Message sent successfully.');
                setUserEmail('');
                setSubject('');
                setMessage('');
                setMessageSent(true);
            }

        } catch (err) {
            console.error('Error submitting form:', err);
            setErrorMessage(`Error: ${err}`);
            return;
        }
    };

    const renderSection = (section: any) => (
        section.sections.map((item: any, index: number) => (
            <Typography key={index} variant={item.type === 'subheading' ? 'h5' : 'body1'} className={item.type === 'subheading' ? 'h5-selector' : 'p-selector'}>
                {item.content}
            </Typography>
        ))
    );

    useEffect(() => {
        const handleResize = () => {
            dispatch(updateLayout({ innerWidth: window.innerWidth, innerHeight: window.innerHeight }));
        };

        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, [dispatch]);

    const main = (
        <>
            {
                errorMessage && <ErrorModal message={errorMessage} onClose={handleCloseModal} />
            }
            <Container component='main' className='main-content' sx={{
                backgroundImage: `url(${bgImage.src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}>
                <Container component='section' className='section-selector'>
                    <Typography variant='h1' className='h1-selector'>
                        Contact Us
                    </Typography>
                    <Divider />
                    <Container component='section' className='section-selector' sx={sectionStyles}>
                        {renderSection(contactContent.contactSection)}
                    </Container>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        width: '100%',
                        padding: '0 2rem',
                    }}>
                        <Typography variant='body1' className='p-selector' align='center'>
                            For professional enquiries, please contact
                            <a href='mailto:jsb-dev@outlook.com' style={{
                                color: 'inherit',
                                textDecoration: 'underline',
                                margin: 0,
                            }}>jsb-dev@outlook.com</a>
                        </Typography>
                        <ContactForm
                            userEmail={userEmail}
                            subject={subject}
                            message={message}
                            setUserEmail={setUserEmail}
                            setSubject={setSubject}
                            setMessage={setMessage}
                            handleSubmitMsg={handleSubmitMsg}
                        />
                        {messageSent && <Typography variant='h5' align='center' className='h5-selector'>Message sent successfully!</Typography>}
                    </Box>
                    <Divider sx={dividerStyles}
                    />
                    <Container component='section' className='section-selector' sx={sectionStyles}>
                        {renderSection(contactContent.postContactSection)}
                    </Container>
                    <Divider sx={dividerStyles} />
                </Container>
                <SiteFooter />
            </Container>
        </>
    );

    return (
        <>
            <Head>
                <title>Diat | Contact</title>
                <meta name="description" content="A drag-and-drop diagram editor with rich text functionality and ease of use." />
                <meta name="keywords" content="Diat, portfolio, web developer, full-stack, full stack, fullstack, web, developer, programmer, coding, coding portfolio, portfolio website, website, web developer portfolio, web developer portfolio website, web developer portfolio" />
            </Head>
            <PageShell content={main} page={'/contact'} />
        </>
    );
};

export default ContactPage;