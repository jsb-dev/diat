import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useDispatch } from 'react-redux';
import { deleteNode } from '../../../../redux/slices/diagramEditorSlice';

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
            <Button variant="contained" color="secondary" onClick={handleClickOpen}>
                Delete Node
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>{"Confirm Deletion"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this node?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="secondary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default NodeDeleteButton;
