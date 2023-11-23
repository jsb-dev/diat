import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useDispatch } from 'react-redux';
import { deleteNode } from '@/redux/slices/diagramEditorSlice';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';

interface NodeDeleteButtonProps {
    nodeId: string;
}

const NodeDeleteButton: React.FC<NodeDeleteButtonProps> = ({ nodeId }) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        dispatch(deleteNode({ nodeId }));
        setOpen(false);
    };

    return (
        <>
            <Button variant='contained' onClick={handleClickOpen} className='quarternary-btn'>
                <RemoveCircleOutlineOutlinedIcon sx={{
                    fontSize: '3rem'
                }} />
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>{'Confirm Deletion'}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this node?
                    </DialogContentText>
                </DialogContent>
                <DialogActions >
                    <Button onClick={handleClose} className='primary-btn'>
                        Back
                    </Button>
                    <Button onClick={handleDelete} className='quarternary-btn'>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default NodeDeleteButton;
