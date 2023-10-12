import React, { useState, useEffect } from 'react';
import { Button, Container } from '@mui/material';
import RichTextEditor from '../text-editor/RichTextEditor';
import { RootState } from '../../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { toggleEditor, updateDocContent } from '../../redux/slices/tiptapSlice';
import { NodeProps } from '@reactflow/core';

const DocumentNode: React.FC<NodeProps> = ({ data }) => {
    const nodeContent = data.content as any;
    const [content, setContent] = useState(nodeContent);
    const [requestUpdate, setRequestUpdate] = useState(false);
    const editorIsOpen = useSelector((state: RootState) => state.editor.editorIsOpen);
    const dispatch = useDispatch();

    const handleToggleEditor = () => {
        dispatch(toggleEditor());
    };

    const handleContentUpdate = (newContent: any) => {
        setContent(newContent);
        setRequestUpdate(true);
    };

    useEffect(() => {
        const updateTimer = setInterval(() => {
            if (requestUpdate) {
                dispatch(
                    updateDocContent({
                        id: data.id,
                        content: content
                    })
                );
                setRequestUpdate(false);
            }
        }, 400);

        return () => {
            clearInterval(updateTimer);
        };
    }
        , [content, data.id, dispatch, requestUpdate]);

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
            <RichTextEditor content={content} onUpdate={handleContentUpdate} isFocusable={editorIsOpen} />
            <Button variant="contained" color="primary" onClick={handleToggleEditor} style={{ pointerEvents: 'auto', position: 'fixed', left: '-25%', top: 0 }}>
                {editorIsOpen ? "Close" : "Edit"}
            </Button>
        </Container>
    );
};

export default DocumentNode;