import React, { useState } from 'react';
import { Button } from '@mui/material';
import RichTextEditor from '../editor/RichTextEditor';
import { DocContent, BlockContent } from '@/interfaces/Document';
import { useSelector, useDispatch } from 'react-redux';
import { toggleEditor } from '../../redux/slices/editorSlice';
import { RootState } from '../../redux/store';

interface DocumentNodeProps {
    data: {
        content: DocContent;
        documentId?: string;
    };
}

const DocumentNode: React.FC<DocumentNodeProps> = ({ data }) => {
    const dispatch = useDispatch();
    const editorIsOpen = useSelector((state: RootState) => state.editor.editorIsOpen);
    const [content, setContent] = useState(data.content);

    const handleContentUpdate = (newContent: DocContent) => {
        setContent(newContent);
    };

    const toggleEditorHandler = () => {
        dispatch(toggleEditor());
    };

    const renderDocContent = (docContent: DocContent) => {
        return docContent.content.map((block: BlockContent, idx: number) => {
            if (block.type === 'bulletList' || block.type === 'orderedList') {
                const ListTag = block.type === 'bulletList' ? 'ul' : 'ol';
                return (
                    <ListTag key={idx}>
                        {block.content.map((listItemContent, listItemIdx) => (
                            <li key={listItemIdx}>
                                {"text" in listItemContent ? listItemContent.text : listItemContent.content.map(text => text.text).join(' ')}
                            </li>
                        ))}
                    </ListTag>
                );
            }

            if (block.type === 'blockquote') {
                return (
                    <blockquote key={idx}>
                        {block.content.map((item, textIdx) => {
                            if ("text" in item) {
                                // It's a TextContent
                                return <span key={textIdx}>{item.text}</span>;
                            } else {
                                // It's a ListItemContent
                                return item.content.map((text, listItemIdx) => <span key={textIdx + '-' + listItemIdx}>{text.text}</span>);
                            }
                        })}
                    </blockquote>

                );
            }

            const HeadingTags: any = {
                heading1: 'h1',
                heading2: 'h2',
                heading3: 'h3',
                heading4: 'h4',
                heading5: 'h5',
                heading6: 'h6',
            };
            const HeadingTag = HeadingTags[block.type];
            if (HeadingTag) {
                return (
                    <HeadingTag key={idx}>
                        {block.content.map((item, textIdx) => {
                            if ("text" in item) {
                                // It's a TextContent
                                return <span key={textIdx}>{item.text}</span>;
                            } else {
                                // It's a ListItemContent
                                return item.content.map((text, listItemIdx) =>
                                    <span key={textIdx + '-' + listItemIdx}>{text.text}</span>
                                );
                            }
                        })}
                    </HeadingTag>

                );
            }

            // Default to a paragraph
            return (
                <p key={idx}>
                    {block.content.map((item, textIdx) => {
                        // Check if it's a TextContent
                        if ("text" in item) {
                            if (item.type === 'bold') {
                                return <strong key={textIdx}>{item.text}</strong>;
                            } else if (item.type === 'italic') {
                                return <em key={textIdx}>{item.text}</em>;
                            } else if (item.type === 'strike') {
                                return <del key={textIdx}>{item.text}</del>;
                            } else if (item.type === 'code') {
                                return <code key={textIdx}>{item.text}</code>;
                            }
                            return <span key={textIdx}>{item.text}</span>;
                        } else {
                            // It's a ListItemContent, which theoretically shouldn't appear in a paragraph, but we're handling it just in case
                            return item.content.map((text, listItemIdx) =>
                                <span key={textIdx + '-' + listItemIdx}>{text.text}</span>
                            );
                        }
                    })}
                </p>

            );
        });
    };

    return (
        <div
            style={{
                width: '300px',
                height: '600px',
                backgroundColor: '#f5f5f5',
                padding: 8,
                margin: 0,
            }}
        >
            {!editorIsOpen ? (
                renderDocContent(content)
            ) : (
                <RichTextEditor content={content} onUpdate={handleContentUpdate} />
            )}
            <Button variant="contained" color="primary" onClick={toggleEditorHandler} style={{ pointerEvents: 'auto', position: 'fixed', left: '-25%', top: 0 }}>
                {editorIsOpen ? "Close Editor" : "Edit"}
            </Button>
        </div>
    );
};

export default DocumentNode;
