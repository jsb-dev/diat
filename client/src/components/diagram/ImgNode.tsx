// ImgNode.tsx
import React from 'react';
import { NodeProps } from '@reactflow/core';

const ImgNode: React.FC<NodeProps> = ({ data }) => {
    const asset = data.content.asset as any;
    console.log('ImgNode.tsx data = (', data);
    console.log('ImgNode.tsx asset = (', asset)

    return (
        <div style={{
            width: '300px',
            height: '600px',
            backgroundColor: '#f5f5f5',
            margin: 0,
        }}>
            <img src={asset} alt="" style={{ width: '100%', minWidth: '100px' }} />
        </div>
    );
};

export default ImgNode;
