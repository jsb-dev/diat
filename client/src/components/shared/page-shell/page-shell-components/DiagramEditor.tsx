import React, { useState, ChangeEvent, CSSProperties } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import AddLinkOutlinedIcon from '@mui/icons-material/AddLinkOutlined';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { addDocNode, addImgNode, addUrlNode } from '@/redux/slices/diagramEditorSlice';

type DialogType = 'ImgOrUrl' | 'img' | 'url' | null;

const DiagramEditor: React.FC = () => {
    const dispatch = useDispatch();

    const [currentDialog, setCurrentDialog] = useState<DialogType>(null);
    const [asset, setAsset] = useState('');
    const [sourceType, setSourceType] = useState<'img' | 'url'>('url');
    const { viewportIsVertical, viewportIsPortable } = useSelector((state: RootState) => state.ui);

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

    const listStyle: CSSProperties = {
        position: 'fixed',
        right: !viewportIsVertical && viewportIsPortable ? '26rem'
            : viewportIsVertical ? 'max(24rem, 160px)'
                : '18rem',
        top: !viewportIsVertical && viewportIsPortable ? '7%'
            : viewportIsVertical ? '32%'
                : '20%',
    };

    const itemStyle: CSSProperties = {
        position: 'fixed',
        cursor: 'pointer',
    };

    return (
        <>
            <ul style={listStyle}>
                <li style={itemStyle}><Button onClick={handleAddDocument} className='ternary-btn'>
                    <NoteAddOutlinedIcon sx={{
                        fontSize: '3rem',
                    }} />
                </Button></li>
                <li style={{ ...itemStyle, transform: 'translate(70%, 100%)' }}><Button onClick={() => setCurrentDialog('ImgOrUrl')} className='ternary-btn'>
                    <AddPhotoAlternateOutlinedIcon sx={{
                        fontSize: '3rem',
                    }} />
                </Button></li>
                <li style={{ ...itemStyle, transform: 'translateY(200%)' }}><Button onClick={() => setCurrentDialog('url')} className='ternary-btn'>
                    <AddLinkOutlinedIcon sx={{
                        fontSize: '3rem',
                    }} />
                </Button></li>
            </ul>

            <Dialog open={currentDialog === 'ImgOrUrl'} onClose={() => setCurrentDialog(null)}>
                <DialogTitle>Select Source</DialogTitle>
                <DialogContent>
                    <Button onClick={() => { setSourceType('img'), setCurrentDialog('img') }}>From File</Button>
                    <Button onClick={() => { setSourceType('img'), setCurrentDialog('url') }}>From URL</Button>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setCurrentDialog(null), setAsset('') }}>Cancel</Button>
                </DialogActions>
            </Dialog>


            <Dialog open={currentDialog === 'img'} onClose={() => setCurrentDialog(null)}>
                <DialogTitle>Add Image</DialogTitle>
                <DialogContent>
                    <input
                        type='file'
                        accept='image/*'
                        onChange={handleFileUpload}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setCurrentDialog(null), setAsset('') }}>Cancel</Button>
                    <Button onClick={() => handleAddResource()}>Add</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={currentDialog === 'url'} onClose={() => setCurrentDialog(null)}>
                <DialogTitle>Add URL</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin='dense'
                        label='Website URL'
                        type='text'
                        fullWidth
                        value={asset}
                        onChange={(e) => setAsset(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setCurrentDialog(null), setAsset('') }}>Cancel</Button>
                    <Button onClick={() => handleAddResource()}>Add</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default DiagramEditor;