export interface TextContent {
    type: 'text' | 'bold' | 'italic' | 'strike' | 'code';
    text: string;
}

export interface ListItemContent {
    type: 'listItem';
    content: TextContent[];
}

export interface BlockContent {
    type: 'paragraph' | 'heading1' | 'heading2' | 'heading3' | 'heading4' | 'heading5' | 'heading6' | 'bulletList' | 'orderedList' | 'blockquote';
    content: (TextContent | ListItemContent)[];
}

export interface DocContent {
    type: 'doc';
    content: BlockContent[];
}
