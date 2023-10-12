import React from 'react';
import { NodeProps } from '@reactflow/core';

const ImgNode: React.FC<NodeProps> = ({ data }) => {
    const asset = data.content.asset as any;

    return (
        <img src={asset} alt="" style={{ width: '600px' }} />
    );
};

export default ImgNode;
