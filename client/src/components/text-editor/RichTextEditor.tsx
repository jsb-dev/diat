import React, { useRef } from 'react';
import { EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import MenuBar from './MenuBar';
import { BlockContent, DocContent, ListItemContent, TextContent } from '@/interfaces/Document';

type JSONContent = {
    type: string;
    content: any[];
};

const translateDocContent = (input: JSONContent): DocContent | null => {
    if (input.type !== 'doc' || !Array.isArray(input.content)) {
        return null;
    }

    const translatedBlocks: BlockContent[] = input.content.map(block => {
        if (!block.type || !Array.isArray(block.content)) {
            return null;
        }

        const blockContent: (TextContent | ListItemContent)[] = block.content.map((contentItem: TextContent | ListItemContent) => {
            if (contentItem.type === 'text') {
                const textContent: TextContent = {
                    type: 'text',
                    text: contentItem.text
                };
                return textContent;
            }

            if (contentItem.type === 'listItem') {
                const listItemContent: ListItemContent = {
                    type: 'listItem',
                    content: contentItem.content
                };
                return listItemContent;
            }

            return null;
        }).filter((item: TextContent | ListItemContent | null) => item !== null) as (TextContent | ListItemContent)[];

        const translatedBlock: BlockContent = {
            type: block.type as BlockContent['type'],
            content: blockContent
        };

        return translatedBlock;
    }).filter(block => block !== null) as BlockContent[];

    const translatedDoc: DocContent = {
        type: 'doc',
        content: translatedBlocks
    };

    return translatedDoc;
};


interface RichTextEditorProps {
    content: DocContent;
    onUpdate: (newContent: DocContent) => void;
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
                const translatedContent = translateDocContent(rawJson as any as JSONContent);
                if (translatedContent) {
                    onUpdate(translatedContent);

                } else {
                    console.error("Received invalid document structure from editor:", rawJson);
                }
            },
        });
    }, []);

    return (
        <div ref={editorRef} style={{
            width: '100%',
            height: '100%',
            overflowX: 'hidden',
            overflowY: 'scroll',
            padding: 0,
            margin: 0,
            pointerEvents: isFocusable ? 'auto' : 'none',
        }} className="RichTextEditor"
        >
            <EditorContent editor={editor} />
            {isFocusable ? (<MenuBar editor={editor} />) : null}
        </div>
    );
};

export default RichTextEditor;
