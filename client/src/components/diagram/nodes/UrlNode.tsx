import React, { useEffect, useState } from 'react';
import { NodeProps, Handle, Position } from '@reactflow/core';
import { Box, Container, Button } from '@mui/material';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import NodeDeleteButton from './node-components/NodeDeleteButton';
import handleStyles from './node-components/NodeHandleStyles';

const UrlNode: React.FC<NodeProps> = ({ data }) => {
    const asset = data.content.asset as string;

    const [webpageInfo, setWebpageInfo] = useState({
        title: '',
        description: '',
        websiteName: '',
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

                const webpageInfo = {
                    title: data.title === 'N/A' ? '' : data.title,
                    description: data.description === 'N/A' ? '' : data.description,
                    websiteName: data.websiteName === 'N/A' ? '' : data.websiteName,
                };

                setWebpageInfo(webpageInfo);
            } catch (error) {
                console.error('Error fetching webpage info:', error);
            }
        };

        fetchData();
    }, [asset, webpageInfo]);

    const commonStyles = {
        margin: '2rem 1rem',
        padding: 0,
        wordWrap: 'break-word' as 'break-word',
        lineHeight: '18pt',
        letterSpacing: '1pt',
    };

    return (
        <Box sx={{ width: '300px', padding: '1rem', backgroundColor: '#3c3c3c' }}>
            <Button
                variant='contained'
                style={{ position: 'fixed', top: '0', right: '0', transform: 'translate(75%, -75%)', }}
                onClick={() => window.open(asset, '_blank')}
                className='pentenary-btn'
            >
                <OpenInNewRoundedIcon />
            </Button>
            {
                <>
                    <h1 style={{ ...commonStyles, textAlign: 'center', fontSize: '12pt' }}>{webpageInfo.title}</h1>
                    <h2 style={{ ...commonStyles, textAlign: 'center', fontSize: '11pt' }}>{webpageInfo.description}</h2>
                </> || null
            }
            <Container sx={{
                backgroundColor: 'rgba(255,255,255,0.3)',
                padding: '1rem',
                margin: '1rem 0',
            }}>
                <p style={commonStyles}><strong>URL:</strong> {
                    asset.length > 75 ? asset.slice(0, 75) + '...' : asset
                }</p>
                <p style={commonStyles}><strong>{webpageInfo.websiteName}</strong></p>
            </Container>
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
            <Container sx={{
                position: 'fixed',
                bottom: '0',
                left: '0',
                transform: 'translate(-25%, 50%)',
            }}>
                <NodeDeleteButton nodeId={data.id} />
            </Container>
        </Box>
    );
};

export default UrlNode;