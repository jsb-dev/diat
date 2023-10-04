import React, { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import Container from '@mui/material/Container';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import { stylesItems, formatItems, headerSizeItems } from '../../assets/data/menu-items';
import { HorizontalRule, South } from '@mui/icons-material';

type EditorType = {
    chain: any,
    can: any,
    isActive: any
};

const MenuBar: React.FC<{ editor: EditorType }> = ({ editor }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const menuIconStyle = {
        fill: 'white'
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    if (!editor) {
        return null;
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

    return (
        <Container style={{
            width: '100vw',
            height: '100vh',
            position: 'fixed',
            right: '0',
            top: '0',
            zIndex: 1000,
            transform: 'translate(100%, 0)',
        }}>
            <IconButton onClick={handleMenuOpen} className="secondary-btn" >
                <FormatBoldIcon style={menuIconStyle} />
                <FormatItalicIcon style={menuIconStyle} />
                <FormatUnderlinedIcon style={menuIconStyle} />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                style={{
                    transform: 'translate(7rem, 2rem)',
                    maxHeight: '400px',
                }}
            >
                {[stylesItems, formatItems, headerSizeItems].map((items, idx) => (
                    items.map((item, innerIdx) => (
                        <MenuItem key={`${idx}-${innerIdx}`} onClick={() => { performAction(item.type); handleMenuClose(); }}>
                            <Tooltip title={item.tooltip}>
                                {
                                    'icon' in item ?
                                        (
                                            <IconButton>
                                                {React.createElement(item.icon)}
                                            </IconButton>
                                        ) :
                                        (
                                            <Button>
                                                {item.title}
                                            </Button>
                                        )
                                }

                            </Tooltip>
                        </MenuItem>
                    ))
                ))}
                <MenuItem onClick={() => { editor.chain().focus().setHorizontalRule().run(); handleMenuClose(); }}>
                    <Tooltip title="Set Horizontal Rule">
                        <IconButton>
                            <HorizontalRule />
                        </IconButton>
                    </Tooltip>
                </MenuItem>
                <MenuItem onClick={() => { editor.chain().focus().setHardBreak().run(); handleMenuClose(); }}>
                    <Tooltip title="Set Hard Break">
                        <IconButton>
                            <South />
                        </IconButton>
                    </Tooltip>
                </MenuItem>
            </Menu>
        </Container>
    );

};

export default MenuBar;
