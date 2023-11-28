import React from 'react';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { Box, Paper, Typography, List, ListItem, ListItemIcon, Button, Container } from '@mui/material';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import AddLinkOutlinedIcon from '@mui/icons-material/AddLinkOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import ContactSupportRoundedIcon from '@mui/icons-material/ContactSupportRounded';
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded';

const iconStyle = {
    fontSize: '3rem',
};

const HelpModal: React.FC = () => {
    const { viewportIsVertical, viewportIsPortable } = useSelector((state: RootState) => state.ui)

    const gridStyle = {
        gridTemplateColumns: viewportIsVertical || viewportIsPortable ? 'repeat(1, 1fr)' : 'repeat(2, 1fr)',
        overflowY: (viewportIsVertical || viewportIsPortable) ? 'scroll' : 'hidden' as 'scroll' | 'hidden',
    };

    const containerStyle = {
        overflowY: !viewportIsVertical && !viewportIsPortable ? 'scroll' : 'hidden',
        ...(viewportIsVertical || viewportIsPortable ? { minHeight: 'fit-content', padding: '2rem 0' } : { height: '25dvh', width: '97%' })
    }

    const paperStyle = {

    };

    return (
        <Box style={gridStyle} className="modal-bg modal-container" >
            <Paper className="quarter-container" sx={paperStyle}>
                <Typography variant="h2" className='h2-selector'>How the diagram works</Typography>
                <Container sx={containerStyle}>
                    <Typography className='p-selector'>The diagram editor has 4 tools:</Typography>
                    <List>
                        <ListItem><ListItemIcon>
                            <Button className='ternary-btn'>
                                <NoteAddOutlinedIcon sx={iconStyle} />
                            </Button></ListItemIcon>Create rich text documents with common styling options</ListItem>
                        <ListItem><ListItemIcon>
                            <Button className='ternary-btn'>
                                <AddPhotoAlternateOutlinedIcon sx={iconStyle} />
                            </Button></ListItemIcon>Upload images from your device or with a link</ListItem>
                        <ListItem><ListItemIcon>
                            <Button className='ternary-btn'>
                                <AddLinkOutlinedIcon sx={iconStyle} />
                            </Button></ListItemIcon>Save links for quick access, we&apos;ll include an up-to-date summary where permitted.</ListItem>
                        <ListItem><ListItemIcon>
                            <Button className='ternary-btn'>
                                <HelpOutlineOutlinedIcon
                                    sx={iconStyle} />
                            </Button></ListItemIcon>Pull up this screen anytime from the dashboard</ListItem>
                    </List>
                    <Typography className='p-selector'>These can all easily be connected, repositioned, and edited in real-time.</Typography>
                </Container>
            </Paper>

            <Paper className="quarter-container" sx={paperStyle}>
                <Typography variant="h2" className='h2-selector'>How nodes work</Typography>
                <Container sx={containerStyle}>
                    <Typography className='p-selector'>Diat has a few basic rules to make it as easy to use as possible:</Typography>
                    <List>
                        <ListItem><ListItemIcon><Button variant='contained' className='ternary-btn' ><EditRoundedIcon sx={iconStyle} /></Button></ListItemIcon>
                            Document Nodes have an edit to open the global text editor, allowing you to scroll documents while
                            freely moving around the rest of the diagram.
                        </ListItem>
                        <ListItem>Once you begin editing a document node, it will lock the diagram positioning. Press the button again to unlock it.</ListItem>
                        <ListItem>Double clicking a node will bring it into focus. This is helpful when quickly moving between editing and repositioning.</ListItem>
                        <ListItem>Use scrollbars to scroll inside nodes and use the mousewheel to adjust zoom. Remember that the editor must be open to allow document scrolling!</ListItem>
                        <ListItem><ListItemIcon>
                            <Button variant='contained' className='quarternary-btn'>
                                <RemoveCircleOutlineOutlinedIcon sx={iconStyle} />
                            </Button>
                        </ListItemIcon>Each node has a Delete Button, which will delete the node after confirmation.</ListItem>
                    </List>
                </Container>
            </Paper>

            <Paper className="quarter-container" sx={paperStyle}>
                <Typography variant="h2" className='h2-selector'>How edges work</Typography>
                <Container sx={containerStyle}>
                    <Typography className='p-selector'>Each node has 4 anchors along the outside; 2 green and 2 pink</Typography>
                    <List>
                        <Container>
                            <ListItem>Click-and-drag from a green anchor to start creating an edge.</ListItem>
                            <ListItem>Connect the edge to a pink anchor to create a link between the two nodes.</ListItem>
                            <ListItem>Click on an edge to delete it from the diagram.</ListItem>
                        </Container>
                    </List>
                    <Typography className='p-selector'>This will help preserve the natural logical flow within your diagram.</Typography>
                </Container>
            </Paper>

            <Paper className="quarter-container" sx={paperStyle}>
                <Typography variant="h2" className='h2-selector'>Explore and Edit</Typography>
                <Container sx={containerStyle}>
                    <Typography className='p-selector' sx={{
                        textAlign: 'center'
                    }}> The <Button className='ternary-btn'>
                            <AccountTreeRoundedIcon sx={{
                                fontSize: '3rem'
                            }} />
                        </Button>button will take you straight back to your diagram
                    </Typography>
                    <Typography className='p-selector' sx={{
                        textAlign: 'center'
                    }}>The <Button className='primary-btn'>
                            <MenuRoundedIcon sx={iconStyle} />
                        </Button> button can be used to navigate
                    </Typography>
                    <List>
                        <ListItem><ListItemIcon><Button className='primary-btn'>
                            <HomeRoundedIcon sx={iconStyle}
                            />
                        </Button></ListItemIcon>Return to the login page</ListItem>
                        <ListItem><ListItemIcon><Button className='primary-btn'>
                            <InfoRoundedIcon sx={iconStyle}
                            />
                        </Button></ListItemIcon>Find out more about how Diat works</ListItem>
                        <ListItem><ListItemIcon><Button className='primary-btn'>
                            <ContactSupportRoundedIcon sx={iconStyle}
                            />
                        </Button></ListItemIcon>Get in contact with us</ListItem>
                        <ListItem><ListItemIcon><Button className='primary-btn'>
                            <ManageAccountsRoundedIcon sx={iconStyle}
                            />
                        </Button></ListItemIcon>Get help, update, or delete your account credentials</ListItem>
                    </List>
                </Container>
            </Paper>
        </Box>

    );
}

export default HelpModal;