export interface TextContent {
    type: 'text';
    text: string;
  }
  
export interface ParagraphContent {
    type: 'paragraph';
    content: TextContent[];
}
  
export interface DocContent {
    type: 'doc';
    content: ParagraphContent[];
}
  
export interface Document {
    userId: string;
    dateModified: Date;
    content: DocContent;
    currentDate: () => string;
}
  