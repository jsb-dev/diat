import React from 'react';
import { Handle, Position } from 'reactflow';
import { NodeProps } from '@reactflow/core';
import { Box, Container } from '@mui/material';
import NodeDeleteButton from './node-components/NodeDeleteButton';
import handleStyles from './node-components/NodeHandleStyles';

const ImgNode: React.FC<NodeProps> = ({ data }) => {
    const asset = data.content.asset as any;

    return (
        <Box>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset} alt="An image you uploaded" style={{ width: '600px', borderRadius: '1rem' }} />
            <Handle
                id="top"
                type="source"
                position={Position.Top}
                isConnectable={true}
                style={handleStyles.top}
            />
            <Handle
                id="right"
                type="source"
                position={Position.Right}
                isConnectable={true}
                style={handleStyles.right}
            />
            <Handle
                id="bottom"
                type="target"
                position={Position.Bottom}
                isConnectable={true}
                style={handleStyles.bottom}
            />
            <Handle
                id="left"
                type="target"
                position={Position.Left}
                isConnectable={true}
                style={handleStyles.left}
            />
            <Container sx={{
                position: 'fixed',
                bottom: '0',
                left: '0',
                transform: 'translate(-10%, 40%)',
            }}>
                <NodeDeleteButton nodeId={data.id} />
            </Container>
        </Box>
    );
};

export default ImgNode;
