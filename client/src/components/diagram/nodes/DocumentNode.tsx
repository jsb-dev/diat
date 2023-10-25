import React, { useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import { Button, Container, Box } from '@mui/material';
import RichTextEditor from '../../text-editor/RichTextEditor';
import { RootState } from '../../../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { toggleEditor, updateDocContent } from '../../../redux/slices/tiptapSlice';
import { NodeProps } from '@reactflow/core';
import NodeDeleteButton from './node-components/NodeDeleteButton';

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
            <Button variant="contained" color="primary" onClick={handleToggleEditor} style={{ pointerEvents: 'auto', position: 'fixed', left: '-25%', top: 0 }}>
                {editorIsOpen ? "Close" : "Edit"}
            </Button>
            <RichTextEditor content={content} onUpdate={handleContentUpdate} isFocusable={editorIsOpen} />
            <Box>
                <Handle
                    id="top"
                    type="source"
                    position={Position.Top}
                    isConnectable={true}
                />
                <Handle
                    id="right"
                    type="source"
                    position={Position.Right}
                    isConnectable={true}
                />
                <Handle
                    id="bottom"
                    type="source"
                    position={Position.Bottom}
                    isConnectable={true}
                />
                <Handle
                    id="left"
                    type="source"
                    position={Position.Left}
                    isConnectable={true}
                />
            </Box>
            <NodeDeleteButton nodeId={data.id} />
        </Container>
    );
};

export default DocumentNode;