import {
    FormatBold,
    FormatItalic,
    StrikethroughS,
    Code,
    FormatClear,
    FormatListBulleted,
    FormatListNumbered,
    FormatQuote,
    Reorder,
} from '@mui/icons-material';

export const stylesItems = [
    {
        icon: FormatBold,
        type: 'bold',
        tooltip: 'Bold'
    },
    {
        icon: FormatItalic,
        type: 'italic',
        tooltip: 'Italic'
    },
    {
        icon: StrikethroughS,
        type: 'strike',
        tooltip: 'Strike'
    },
    {
        icon: Code,
        type: 'code',
        tooltip: 'Code'
    },
    {
        icon: FormatClear,
        type: 'clearAll',
        tooltip: 'Clear Font Styling'
    },
];

export const formatItems = [
    {
        icon: FormatListBulleted,
        type: 'bulletList',
        tooltip: 'Bullet List',
    },
    {
        icon: FormatListNumbered,
        type: 'orderedList',
        tooltip: 'Ordered List',
    },
    {
        icon: FormatQuote,
        type: 'blockquote',
        tooltip: 'Blockquote',
    },
    {
        icon: Reorder,
        type: 'clearNodes',
        tooltip: 'Clear Text Formatting',
    },
];

export const headerSizeItems = [
    {
        type: 'heading6',
        tooltip: 'Heading 6',
        title: 'H6',
    },
    {
        type: 'heading5',
        tooltip: 'Heading 5',
        title: 'H5',
    },
    {
        type: 'heading4',
        tooltip: 'Heading 4',
        title: 'H4',
    },
    {
        type: 'heading3',
        tooltip: 'Heading 3',
        title: 'H3',
    },
    {
        type: 'heading2',
        tooltip: 'Heading 2',
        title: 'H2',
    },
    {
        type: 'heading1',
        tooltip: 'Heading 1',
        title: 'H1',
    },
];