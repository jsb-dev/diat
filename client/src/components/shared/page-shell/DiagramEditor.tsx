import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { addDocNode, addEdge, addImgNode, addUrlNode } from '../../../redux/slices/diagramEditorSlice';

type DialogType = 'fileOrUrl' | 'image' | 'url' | null;

const DiagramEditor: React.FC = () => {
    const dispatch = useDispatch();
    const [currentDialog, setCurrentDialog] = useState<DialogType>(null);
    const [asset, setAsset] = useState('');

    const handleAddDocument = () => {
        dispatch(addDocNode({ type: 'documentNode', x: 0, y: 0 }));
    };

    const handleAddImage = () => {
        dispatch(addImgNode({ type: 'imgNode', asset, x: 0, y: 0 }));
        setAsset(''); // Reset asset
        setCurrentDialog(null);
    };

    const handleAddUrl = () => {
        dispatch(addUrlNode({ type: 'urlNode', asset, x: 0, y: 0 }));
        setAsset(''); // Reset asset
        setCurrentDialog(null);
    };

    const handleConnect = () => {
        // Placeholder implementation
        dispatch(addEdge({ source: 'sourceNodeId', sourceHandle: 'sourceHandle', target: 'targetNodeId', targetHandle: 'targetHandle' }));
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => setAsset(reader.result as string);
        }
    };

    return (
        <>
            <ul style={{ listStyleType: 'none', position: 'absolute', bottom: '13rem', right: '2rem' }}>
                <li><Button onClick={handleAddDocument} style={{ ...buttonStyle }}>Add Document</Button></li>
                <li><Button onClick={() => setCurrentDialog('fileOrUrl')} style={{ ...buttonStyle }}>Add Image</Button></li>
                <li><Button onClick={() => setCurrentDialog('url')} style={{ ...buttonStyle }}>Add URL</Button></li>
                <li><Button onClick={handleConnect} style={{ ...buttonStyle }}>Connect</Button></li>
            </ul>

            {/* Image Dialogs */}
            <Dialog open={currentDialog === 'fileOrUrl'} onClose={() => setCurrentDialog(null)}>
                <DialogTitle>Select Source</DialogTitle>
                <DialogContent>
                    <Button onClick={() => setCurrentDialog('image')}>From File</Button>
                    <Button onClick={() => setCurrentDialog('url')}>From URL</Button>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setCurrentDialog(null)}>Cancel</Button>
                </DialogActions>
            </Dialog>


            <Dialog open={currentDialog === 'image'} onClose={() => setCurrentDialog(null)}>
                <DialogTitle>Add Image</DialogTitle>
                <DialogContent>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setCurrentDialog(null)}>Cancel</Button>
                    <Button onClick={handleAddImage}>Add</Button>
                </DialogActions>
            </Dialog>

            {/* URL Dialog */}
            <Dialog open={currentDialog === 'url'} onClose={() => setCurrentDialog(null)}>
                <DialogTitle>Add URL</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Website URL"
                        type="text"
                        fullWidth
                        value={asset}
                        onChange={(e) => setAsset(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setCurrentDialog(null)}>Cancel</Button>
                    <Button onClick={handleAddUrl}>Add</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

const buttonStyle: React.CSSProperties = {
    borderRadius: '1rem',
    width: '6rem',
    height: '6rem',
    backgroundColor: '#c37ee0',
    color: '#fff',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.2rem',
};

export default DiagramEditor;
