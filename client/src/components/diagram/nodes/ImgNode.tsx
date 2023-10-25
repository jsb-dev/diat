import React from 'react';
import { Handle, Position } from 'reactflow';
import { NodeProps } from '@reactflow/core';
import { Box } from '@mui/material';
import NodeDeleteButton from './node-components/NodeDeleteButton';


const ImgNode: React.FC<NodeProps> = ({ data }) => {
    const asset = data.content.asset as any;

    return (
        <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset} alt="An image you uploaded" style={{ width: '600px' }} />
            <Box>
                <Handle
                    id="top"
                    type="target"
                    position={Position.Top}
                    isConnectable={true}
                />
                <Handle
                    id="right"
                    type="target"
                    position={Position.Right}
                    isConnectable={true}
                />
                <Handle
                    id="bottom"
                    type="target"
                    position={Position.Bottom}
                    isConnectable={true}
                />
                <Handle
                    id="left"
                    type="target"
                    position={Position.Left}
                    isConnectable={true}
                />
                <NodeDeleteButton nodeId={data.id} />
            </Box>
        </>
    );
};

export default ImgNode;
