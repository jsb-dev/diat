import React from 'react';
import { Handle, Position } from 'reactflow';
import { NodeProps } from '@reactflow/core';
import { Box } from '@mui/material';


const ImgNode: React.FC<NodeProps> = ({ data }) => {
    const asset = data.content.asset as any;

    return (
        <>
            <img src={asset} alt="" style={{ width: '600px' }} />
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
            </Box>
        </>
    );
};

export default ImgNode;
