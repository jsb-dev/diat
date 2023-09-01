import React, { useRef } from 'react';
import { BubbleMenu, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import MenuBar from './MenuBar';
import Button from '@mui/material/Button';
import { DocContent } from '@/interfaces/Document';

interface RichTextEditorProps {
    content: DocContent;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ content }) => {
    const editorRef = useRef(null);
    const editor = new Editor({
        extensions: [StarterKit],
        content: content,
        onUpdate: ({ editor }) => {
            const json = editor.getJSON();
            console.log(json);
            // save the json to diagram state here
        },
    });

    return (
        <div ref={editorRef} id="editor">
            <MenuBar editor={editor} />

            {editor && (
                <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
                    <Button
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        variant={editor.isActive('bold') ? 'contained' : 'outlined'}
                        color="primary"
                    >
                        B
                    </Button>
                    <Button
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        variant={editor.isActive('italic') ? 'contained' : 'outlined'}
                        color="primary"
                    >
                        I
                    </Button>
                    <Button
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        variant={editor.isActive('strike') ? 'contained' : 'outlined'}
                        color="primary"
                    >
                        S
                    </Button>
                </BubbleMenu>
            )}
            <EditorContent editor={editor} />
        </div>
    );
};

export default RichTextEditor;
