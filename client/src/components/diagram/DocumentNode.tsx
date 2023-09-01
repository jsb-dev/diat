import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@mui/material';
import RichTextEditor from '../editor/RichTextEditor';
import { DocContent } from '@/interfaces/Document';

interface DocumentNodeProps {
    data: {
        content: DocContent;
        documentId?: string;
    };
}

const DocumentNode: React.FC<DocumentNodeProps> = ({ data }) => {
    const [editorIsOpen, setEditorIsOpen] = useState(false);

    const toggleEditor = () => {
        setEditorIsOpen(prevState => !prevState);
    };

    const id = data.documentId ? data.documentId : uuidv4();

    const getCurrentDate = (): string => {
        const date = new Date();
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };

    if (!editorIsOpen) {
        return (
            <div style={{ width: '300px', height: '600px', backgroundColor: '#f5f5f5' }}>
                <Button variant="contained" color="primary" onClick={toggleEditor}>
                    Edit
                </Button>
                {data.content.type === 'doc' &&
                    data.content.content.map((paragraph, index) => (
                        <p key={index}>
                            {paragraph.content.map(textContent => textContent.text).join(' ')}
                        </p>
                    ))
                }
            </div>
        );
    }

    return (
        <div>
            <Button variant="contained" color="primary" onClick={toggleEditor}>
                Close Editor
            </Button>
            <RichTextEditor content={data.content} />
        </div>
    );
};

export default DocumentNode;
