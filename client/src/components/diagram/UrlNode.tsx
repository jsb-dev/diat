import React, { useEffect, useState } from 'react';
import { NodeProps } from '@reactflow/core';

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
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/diagram/url`, {
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
        </div>
    );
};

export default UrlNode;
