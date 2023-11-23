import React, { useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import { Button, Container, Box } from '@mui/material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded';
import RichTextEditor from '@/components/shared/text-editor/RichTextEditor';
import { RootState } from '@/redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { toggleEditor, updateDocContent } from '@/redux/slices/tiptapSlice';
import { NodeProps } from '@reactflow/core';
import NodeDeleteButton from './node-components/NodeDeleteButton';
import handleStyles from './node-components/NodeHandleStyles';

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
        <Container
            className='DocumentNode'
        >
            <Container sx={{
                position: 'fixed',
                top: '0',
                left: '0',
                transform: 'translate(-10%, -50%)',
            }}>
                <Button variant='contained' onClick={handleToggleEditor} className='ternary-btn' style={{ pointerEvents: 'auto' }}>
                    {editorIsOpen ?
                        <LockOpenRoundedIcon sx={{
                            fontSize: '3rem'
                        }} /> :
                        <EditRoundedIcon sx={{
                            fontSize: '3rem'
                        }} />
                    }
                </Button>
            </Container>
            <RichTextEditor content={content} onUpdate={handleContentUpdate} isFocusable={editorIsOpen} />
            <Box>
                <Handle
                    id='top'
                    type='source'
                    position={Position.Top}
                    isConnectable={true}
                    style={handleStyles.top}
                />
                <Handle
                    id='right'
                    type='source'
                    position={Position.Right}
                    isConnectable={true}
                    style={handleStyles.right}
                />
                <Handle
                    id='bottom'
                    type='target'
                    position={Position.Bottom}
                    isConnectable={true}
                    style={handleStyles.bottom}
                />
                <Handle
                    id='left'
                    type='target'
                    position={Position.Left}
                    isConnectable={true}
                    style={handleStyles.left}
                />
            </Box>
            <Container sx={{
                position: 'fixed',
                bottom: '0',
                left: '0',
                transform: 'translate(-10%, 50%)',
            }}>
                <NodeDeleteButton nodeId={data.id} />
            </Container>
        </Container>
    );
};

export default DocumentNode;