import React, { useState, ChangeEvent, CSSProperties } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import AddLinkOutlinedIcon from '@mui/icons-material/AddLinkOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { addDocNode, addImgNode, addUrlNode } from '@/redux/slices/diagramEditorSlice';
import HelpModal from './HelpModal';
import { textFieldStyle } from '@/assets/styles/SharedComponentStyles';

type DialogType = 'ImgOrUrl' | 'img' | 'url' | null;

const contentStyles: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    padding: '3rem',
    overflow: 'hidden',
};

const itemStyle: CSSProperties = {
    position: 'fixed',
    cursor: 'pointer',
};

const DiagramEditor: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentDialog, setCurrentDialog] = useState<DialogType>(null);
    const [asset, setAsset] = useState('');
    const [sourceType, setSourceType] = useState<'img' | 'url'>('url');
    const { viewportIsVertical, viewportIsPortable } = useSelector((state: RootState) => state.ui);
    const dispatch = useDispatch();

    const listStyle: CSSProperties = {
        position: 'fixed',
        right: !viewportIsVertical && viewportIsPortable ? '28rem'
            : viewportIsVertical ? 'max(24rem, 160px)'
                : '16rem',
        top: !viewportIsVertical && viewportIsPortable ? '10%'
            : viewportIsVertical ? '30%'
                : '25%',
    };

    const toggleModal = () => setIsModalOpen(!isModalOpen);

    const handleAddDocument = () => {
        dispatch(addDocNode({ type: 'documentNode', x: 0, y: 0 }));
    };

    const handleAddImage = () => {
        dispatch(addImgNode({ type: 'imgNode', asset, x: 0, y: 0 }));
        setAsset('');
        setCurrentDialog(null);
    };

    const handleAddUrl = () => {
        dispatch(addUrlNode({ type: 'urlNode', asset, x: 0, y: 0 }));
        setAsset('');
        setCurrentDialog(null);
    };

    const handleAddResource = () => {
        if (sourceType === 'img') {
            handleAddImage();
        } else if (sourceType === 'url') {
            handleAddUrl();
        }
        setAsset('');
        setSourceType('url');
        setCurrentDialog(null);
    };

    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => setAsset(reader.result as string);
        }
    };

    return (
        <>
            <ul style={listStyle}>
                <li style={itemStyle}>
                    <Button onClick={handleAddDocument} className='ternary-btn'>
                        <NoteAddOutlinedIcon sx={{
                            fontSize: '3rem',
                        }} />
                    </Button>
                </li>
                <li style={{ ...itemStyle, transform: 'translate(70%, 100%)' }}>
                    <Button onClick={() => setCurrentDialog('ImgOrUrl')} className='ternary-btn'>
                        <AddPhotoAlternateOutlinedIcon sx={{
                            fontSize: '3rem',
                        }} />
                    </Button>
                </li>
                <li style={{ ...itemStyle, transform: 'translateY(200%)' }}>
                    <Button onClick={() => setCurrentDialog('url')} className='ternary-btn'>
                        <AddLinkOutlinedIcon sx={{
                            fontSize: '3rem',
                        }} />
                    </Button>
                </li>
                <li style={{ ...itemStyle, transform: 'translate(-70%, 100%)' }}>
                    <Button onClick={toggleModal} className='ternary-btn'>
                        <HelpOutlineOutlinedIcon
                            sx={{
                                fontSize: '3rem',
                            }} />
                    </Button>
                </li>
            </ul>

            <Dialog open={currentDialog === 'ImgOrUrl'} onClose={() => setCurrentDialog(null)}>
                <Container className='editor-dialog'>
                    <DialogTitle>Select Source</DialogTitle>
                    <DialogContent sx={contentStyles}>
                        <Button onClick={() => { setSourceType('img'), setCurrentDialog('img') }} className='secondary-btn' sx={{ width: '100%' }}>From File</Button>
                        <Button onClick={() => { setSourceType('img'), setCurrentDialog('url') }} className='secondary-btn' sx={{ width: '100%' }}>From URL</Button>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => { setCurrentDialog(null), setAsset('') }} className='primary-btn'>Cancel</Button>
                    </DialogActions>
                </Container>
            </Dialog>

            <Dialog open={currentDialog === 'img'} onClose={() => setCurrentDialog(null)}>
                <Container className='editor-dialog'>
                    <DialogTitle>Add Image</DialogTitle>
                    <DialogContent sx={contentStyles}>
                        <input
                            type='file'
                            accept='image/*'
                            onChange={handleFileUpload}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => { setCurrentDialog(null), setAsset('') }} className='primary-btn'>Cancel</Button>
                        <Button onClick={() => handleAddResource()} className='secondary-btn'>Add</Button>
                    </DialogActions>
                </Container>
            </Dialog>

            <Dialog open={currentDialog === 'url'} onClose={() => setCurrentDialog(null)}>
                <Container className='editor-dialog'>
                    <DialogTitle>Add URL</DialogTitle>
                    <DialogContent>
                        <TextField
                            margin='dense'
                            label='Website URL'
                            type='text'
                            fullWidth
                            value={asset}
                            onChange={(e) => setAsset(e.target.value)}
                            className='text-field-selector'
                            sx={textFieldStyle}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => { setCurrentDialog(null), setAsset('') }} className='primary-btn'>Cancel</Button>
                        <Button onClick={() => handleAddResource()} className='secondary-btn'>Add</Button>
                    </DialogActions>
                </Container>
            </Dialog>

            {isModalOpen && <HelpModal />}
        </>
    );
};

export default DiagramEditor;