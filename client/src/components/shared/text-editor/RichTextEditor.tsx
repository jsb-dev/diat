import React, { useRef } from 'react';
import { EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import MenuBar from './MenuBar';
import { Container } from '@mui/material';
import { JSONContent } from '@tiptap/core';

interface RichTextEditorProps {
    content: JSONContent;
    onUpdate: (newContent: JSONContent) => void;
    isFocusable: boolean;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ content, onUpdate, isFocusable }) => {
    const editorRef = useRef(null);
    const editor = React.useMemo(() => {
        return new Editor({
            extensions: [
                StarterKit
            ],
            content: content,
            onUpdate: ({ editor }) => {
                const rawJson = editor.getJSON();
                if (rawJson) {
                    onUpdate(rawJson);

                } else {
                    console.error('Received invalid document structure from editor:', rawJson);
                }
            },
        });
    }, []);

    return (
        <Container ref={editorRef} style={{
            pointerEvents: isFocusable ? 'auto' : 'none',
        }} className='RichTextEditor'
        >
            <EditorContent style={{
                borderRadius: '1rem',
            }} editor={editor} />
            {isFocusable ? (
                <Container style={{
                    position: 'fixed',
                    left: '0',
                    top: '0',
                    padding: 0,
                    margin: 0,
                    zIndex: 1000,
                    transform: 'translate(10%, -50%)',
                }}>
                    <MenuBar editor={editor} />
                </Container>
            ) : null}
        </Container>
    );
};

export default RichTextEditor;
