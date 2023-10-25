import React, { useEffect, useState } from 'react';
import { NodeProps, Handle, Position } from '@reactflow/core';
import { Box } from '@mui/material';
import NodeDeleteButton from './node-components/NodeDeleteButton';

const UrlNode: React.FC<NodeProps> = ({ data }) => {
    const asset = data.content.asset as string;

    const [webpageInfo, setWebpageInfo] = useState({
        title: '',
        description: `We couldn't create a summary for this link`,
        body: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/node/post/url`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ url: asset }),
                }
                );

                if (!response.ok) {
                    console.error('Failed to fetch webpage info:', response.status, response.statusText);
                    return;
                }

                const data = await response.json();
                setWebpageInfo(data);
            } catch (error) {
                console.error('Error fetching webpage info:', error);
            }
        };

        fetchData();
    }, [asset, webpageInfo]);

    return (
        <div style={{ width: '300px', minHeight: '300px', padding: 8, backgroundColor: 'white' }}>
            <h1>{webpageInfo.title}</h1>
            <h2>{webpageInfo.description}</h2>
            <article>
                <p><strong>URL: {asset}</strong></p>
                <p>{webpageInfo.body}</p>
            </article>
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
            <NodeDeleteButton nodeId={data.id} />
        </div>
    );
};

export default UrlNode;
