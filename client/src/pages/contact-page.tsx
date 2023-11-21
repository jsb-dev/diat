import React, { useState, useEffect } from 'react';
import { Container, Divider, Box, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateLayout } from '@/redux/slices/uiSlice';
import PageShell from '@/components/shared/page-shell/PageShell';
import ContactForm from '@/components/shared/ContactForm';
import SiteFooter from '@/components/shared/SiteFooter';
import contactContent from '@/assets/data/ContactContent.json';

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

    const dispatch = useDispatch();

    const handleSubmitMsg = async () => {
        if (!userEmail || !subject || !message) {
            console.error('All fields are required.');
            return;
        } else if (!userEmail.includes('@') || !userEmail.includes('.')) {
            console.error('Invalid email.');
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
                throw new Error(`Error: ${response.status}`);
            } else if (response.status === 200) {
                console.log('Message sent successfully.');
                setUserEmail('');
                setSubject('');
                setMessage('');
            }

        } catch (err) {
            console.error('Error submitting form:', err);
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
        <Container component='main' className='main-content' >
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
                }}>
                    <ContactForm
                        userEmail={userEmail}
                        subject={subject}
                        message={message}
                        setUserEmail={setUserEmail}
                        setSubject={setSubject}
                        setMessage={setMessage}
                        handleSubmitMsg={handleSubmitMsg}
                    />
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
    );

    return <PageShell content={main} page={'/contact'} />;
}

export default ContactPage;