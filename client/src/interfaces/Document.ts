interface TextContent {
    type: 'text';
    text: string;
  }
  
interface ParagraphContent {
    type: 'paragraph';
    content: TextContent[];
}
  
interface DocContent {
    type: 'doc';
    content: ParagraphContent[];
}
  
interface Document {
    userId: string;
    dateModified: Date;
    content: DocContent;
    currentDate: () => string;
}
  