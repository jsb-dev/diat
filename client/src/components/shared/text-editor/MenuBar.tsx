import React, { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import { stylesItems, formatItems, headerSizeItems } from '@/assets/data/menu-items';

type EditorType = {
    chain: any,
    can: any,
    isActive: any
};

const menuIconStyle = {
    fill: 'white'
};

const menuStyle = {
    height: '80dvh',
    margin: '1rem',
    position: 'fixed',
    top: 0,
    left: 0,
    '& .MuiPaper-root': {
        backgroundColor: 'rgba(255,255,255,0.92)',
    },
};

const buttonStyle = {
    color: '#252c2b',
    width: '30px',
}

const MenuBar: React.FC<{ editor: EditorType }> = ({ editor }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        anchorEl ? setAnchorEl(null) : setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        editor?.chain().focus().run();
    };

    if (!editor) {
        return null;
    }

    // Returns if a specific type/style is currently active.
    const isActiveForType = (type: string): boolean => {
        switch (type) {
            case 'bold':
                return editor.isActive('bold');
            case 'italic':
                return editor.isActive('italic');
            case 'strike':
                return editor.isActive('strike');
            case 'code':
                return editor.isActive('code');
            case 'bulletList':
                return editor.isActive('bulletList');
            case 'orderedList':
                return editor.isActive('orderedList');
            case 'blockquote':
                return editor.isActive('blockquote');
            case 'heading6':
                return editor.isActive('heading', { level: 6 });
            case 'heading5':
                return editor.isActive('heading', { level: 5 });
            case 'heading4':
                return editor.isActive('heading', { level: 4 });
            case 'heading3':
                return editor.isActive('heading', { level: 3 });
            case 'heading2':
                return editor.isActive('heading', { level: 2 });
            case 'heading1':
                return editor.isActive('heading', { level: 1 });
            default:
                return false;
        }
    }

    const performAction = (type: string) => {
        switch (type) {
            case 'bold':
                return editor.chain().focus().toggleBold().run();
            case 'italic':
                return editor.chain().focus().toggleItalic().run();
            case 'strike':
                return editor.chain().focus().toggleStrike().run();
            case 'code':
                return editor.chain().focus().toggleCode().run();
            case 'clearAll':
                return editor.chain().focus().unsetAllMarks().run();
            case 'bulletList':
                return editor.chain().focus().toggleBulletList().run();
            case 'orderedList':
                return editor.chain().focus().toggleOrderedList().run();
            case 'blockquote':
                return editor.chain().focus().toggleBlockquote().run();
            case 'clearNodes':
                return editor.chain().focus().clearNodes().run();
            case 'heading6':
                return editor.chain().focus().toggleHeading({ level: 6 }).run();
            case 'heading5':
                return editor.chain().focus().toggleHeading({ level: 5 }).run();
            case 'heading4':
                return editor.chain().focus().toggleHeading({ level: 4 }).run();
            case 'heading3':
                return editor.chain().focus().toggleHeading({ level: 3 }).run();
            case 'heading2':
                return editor.chain().focus().toggleHeading({ level: 2 }).run();
            case 'heading1':
                return editor.chain().focus().toggleHeading({ level: 1 }).run();
            default:
                return;
        }
    }

    // Returns if a specific type/style action can be performed.
    const canPerformActionForType = (type: string): boolean => {
        switch (type) {
            case 'bold':
                return editor.can().chain().focus().toggleBold().run();
            case 'italic':
                return editor.can().chain().focus().toggleItalic().run();
            case 'strike':
                return editor.can().chain().focus().toggleStrike().run();
            case 'code':
                return editor.can().chain().focus().toggleCode().run();
            case 'clearAll':
                return editor.can().chain().focus().unsetAllMarks().run();
            case 'bulletList':
                return editor.can().chain().focus().toggleBulletList().run();
            case 'orderedList':
                return editor.can().chain().focus().toggleOrderedList().run();
            case 'blockquote':
                return editor.can().chain().focus().toggleBlockquote().run();
            case 'clearNodes':
                return editor.can().chain().focus().clearNodes().run();
            case 'heading6':
                return editor.can().chain().focus().toggleHeading({ level: 6 }).run();
            case 'heading5':
                return editor.can().chain().focus().toggleHeading({ level: 5 }).run();
            case 'heading4':
                return editor.can().chain().focus().toggleHeading({ level: 4 }).run();
            case 'heading3':
                return editor.can().chain().focus().toggleHeading({ level: 3 }).run();
            case 'heading2':
                return editor.can().chain().focus().toggleHeading({ level: 2 }).run();
            case 'heading1':
                return editor.can().chain().focus().toggleHeading({ level: 1 }).run();
            default:
                return false;
        }
    }

    const renderButton = (item: any) => {
        return 'icon' in item ? (
            <Button
                disabled={!canPerformActionForType(item.type)}
                style={isActiveForType(item.type) ? { color: '#5a9ac8' } : {}}
                sx={buttonStyle}
            >
                {React.createElement(item.icon)}
            </Button>
        ) : (
            <Button
                disabled={!canPerformActionForType(item.type)}
                style={isActiveForType(item.type) ? { color: '#5a9ac8' } : {}}
                sx={buttonStyle}
            >
                {item.title}
            </Button>
        );
    };

    return (
        <Container>
            <Tooltip
                title='Styles'
                placement='top'
                arrow
            >
                <IconButton onClick={handleMenuOpen} className='ternary-btn' >
                    <FormatBoldIcon style={menuIconStyle} />
                    <FormatItalicIcon style={menuIconStyle} />
                    <FormatUnderlinedIcon style={menuIconStyle} />
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                sx={menuStyle}
            >
                {[stylesItems, formatItems, headerSizeItems].map((items, idx) => (
                    items.map((item, innerIdx) => (
                        <MenuItem key={`${idx}-${innerIdx}`} onClick={() => { performAction(item.type); }}>
                            {
                                canPerformActionForType(item.type) ? (
                                    <Tooltip title={item.tooltip} placement='left' arrow>
                                        {renderButton(item)}
                                    </Tooltip>
                                ) : (
                                    renderButton(item)
                                )
                            }
                        </MenuItem>
                    ))
                ))}
            </Menu>
        </Container >
    );

};

export default MenuBar;
