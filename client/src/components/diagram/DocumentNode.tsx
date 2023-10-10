import React, { useState } from 'react';
import { Button, Container } from '@mui/material';
import RichTextEditor from '../text-editor/RichTextEditor';
import { RootState } from '../../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { toggleEditor } from '../../redux/slices/tiptapSlice';
import { NodeProps } from '@reactflow/core';

const DocumentNode: React.FC<NodeProps> = ({ data }) => {
    const nodeContent = data.content as any;
    const [content, setContent] = useState(nodeContent);
    const focusedNode = useSelector((state: RootState) => state.diagramEditor.focusedNode);
    const editorIsOpen = useSelector((state: RootState) => state.editor.editorIsOpen);
    const dispatch = useDispatch();

    const handleContentUpdate = (newContent: any) => {
        setContent(newContent);
    };

    const handleToggleEditor = () => {
        dispatch(toggleEditor());
    };

    return (
        <Container component="div"
            style={{
                width: '300px',
                height: '600px',
                backgroundColor: '#f5f5f5',
                padding: '1rem .5rem',
                margin: 0,
            }}
            className="DocumentNode"
        >
            <RichTextEditor content={content} onUpdate={handleContentUpdate} isFocusable={editorIsOpen}/>
            <Button variant="contained" color="primary" onClick={handleToggleEditor} style={{ pointerEvents: 'auto', position: 'fixed', left: '-25%', top: 0 }}>
                {editorIsOpen ? "Close" : "Edit"}
            </Button>
        </Container>
    );
};

export default DocumentNode;