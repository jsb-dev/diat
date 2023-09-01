import React, { useState, MouseEvent } from 'react';
import { useRouter } from 'next/router';
import Menu from '@mui/material/Menu';

type EditorType = {
    chain: any,
    can: any,
    isActive: any
};

const BackToDashboardButton = () => {
    const router = useRouter();
    return (
        <button onClick={() => router.push('/dashboard-page')}>
            Exit
        </button>
    );
};

const useMenu = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOpen = (event: MouseEvent<HTMLElement>) => {
        anchorEl ? handleClose() : setAnchorEl(event.currentTarget);
    };

    return { anchorEl, handleClose, handleOpen };
};

const menuStyles = {
    padding: 10,
    borderRadius: 20,
};

const MenuBar: React.FC<{ editor: EditorType }> = ({ editor }) => {
    const stylesMenu = useMenu();
    const formatMenu = useMenu();
    const headerSizeMenu = useMenu();

    if (!editor) {
        return null;
    }

    const stylesItems = [
        {
            // icon: BoldIcon,
            action: editor.chain().focus().toggleBold(),
            active: editor.isActive('bold'),
            disabled: !editor.can().chain().focus().toggleBold().run(),
        },
        {
            // icon: ItalicIcon,
            action: editor.chain().focus().toggleItalic(),
            active: editor.isActive('italic'),
            disabled: !editor.can().chain().focus().toggleItalic().run(),
        },
        {
            // icon: StrikethroughIcon,
            action: editor.chain().focus().toggleStrike(),
            active: editor.isActive('strike'),
            disabled: !editor.can().chain().focus().toggleStrike().run(),
        },
        {
            // icon: CodeIcon,
            action: editor.chain().focus().toggleCode(),
            active: editor.isActive('code'),
            disabled: !editor.can().chain().focus().toggleCode().run(),
        },
        {
            // icon: ClearStylesIcon,
            action: editor.chain().focus().unsetAllMarks(),
            active: false,
            disabled: !editor.can().chain().focus().unsetAllMarks().run(),
        },
    ];

    const formatItems = [
        {
            // icon: BulletListIcon,
            action: editor.chain().focus().toggleBulletList(),
            active: editor.isActive('bulletList'),
            disabled: !editor.can().chain().focus().toggleBulletList().run(),
        },
        {
            // icon: OrderedListIcon,
            action: editor.chain().focus().toggleOrderedList(),
            active: editor.isActive('orderedList'),
            disabled: !editor.can().chain().focus().toggleOrderedList().run(),
        },
        {
            // icon: BlockQuoteIcon,
            action: editor.chain().focus().toggleBlockquote(),
            active: editor.isActive('blockquote'),
            disabled: !editor.can().chain().focus().toggleBlockquote().run(),
        },
        {
            // icon: ClearFormatIcon,
            action: editor.chain().focus().clearNodes(),
            active: false,
            disabled: !editor.can().chain().focus().clearNodes().run(),
        },
    ];

    const headerSizeItems = [
        {
            title: '14pt',
            action: editor.chain().focus().toggleHeading({ level: 6 }),
            active: editor.isActive('heading', { level: 6 }),
        },
        {
            title: '16pt',
            action: editor.chain().focus().toggleHeading({ level: 5 }),
            active: editor.isActive('heading', { level: 5 }),
        },
        {
            title: '18pt',
            action: editor.chain().focus().toggleHeading({ level: 4 }),
            active: editor.isActive('heading', { level: 4 }),
        },
        {
            title: '20pt',
            action: editor.chain().focus().toggleHeading({ level: 3 }),
            active: editor.isActive('heading', { level: 3 }),
        },
        {
            title: '22pt',
            action: editor.chain().focus().toggleHeading({ level: 2 }),
            active: editor.isActive('heading', { level: 2 }),
        },
        {
            title: '24pt',
            action: editor.chain().focus().toggleHeading({ level: 1 }),
            active: editor.isActive('heading', { level: 1 }),
        },
    ];

    return (
        <>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    zIndex: 100,
                }}
            >
                <div
                    style={{
                        backgroundColor: '#383838',
                        borderRadius: 20,
                        padding: 10,
                        margin: 10,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <button onClick={stylesMenu.handleOpen}>
                        Bold
                        <Menu
                            id="styles-menu"
                            anchorEl={stylesMenu.anchorEl}
                            keepMounted
                            open={Boolean(stylesMenu.anchorEl)}
                            onClose={stylesMenu.handleClose}
                            slotProps={
                                { paper: { style: menuStyles } }
                            }
                        >
                            {stylesItems.map((stylesItem, index) => (
                                <button
                                    key={index}
                                    onClick={() => stylesItem.action.run()}
                                    disabled={stylesItem.disabled}
                                    className={stylesItem.active ? 'is-active' : ''}
                                >
                                </button>
                            ))}
                        </Menu>
                    </button>
                    <button onClick={formatMenu.handleOpen}>
                        Bullet
                        <Menu
                            id="format-menu"
                            anchorEl={formatMenu.anchorEl}
                            keepMounted
                            open={Boolean(formatMenu.anchorEl)}
                            onClose={formatMenu.handleClose}
                            PaperProps={{
                                style: menuStyles,
                            }}
                        >
                            {formatItems.map((formatItem, index) => (
                                <button
                                    id={'format-menu-item-' + index}
                                    key={index}
                                    onClick={() => formatItem.action.run()}
                                    disabled={formatItem.disabled}
                                    className={formatItem.active ? 'is-active' : ''}
                                >
                                </button>
                            ))}
                        </Menu>
                    </button>
                    <button onClick={headerSizeMenu.handleOpen}>
                        Header
                        <Menu
                            id="styles-menu"
                            anchorEl={headerSizeMenu.anchorEl}
                            keepMounted
                            open={Boolean(headerSizeMenu.anchorEl)}
                            onClose={headerSizeMenu.handleClose}
                        >
                            <div
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(3, 1fr)',
                                    gridGap: 10,
                                }}
                            >
                                {headerSizeItems.map((headerSizeItem, index) => (
                                    <button
                                        key={index}
                                        onClick={() => headerSizeItem.action.run()}
                                        disabled={headerSizeItem.active}
                                        className={headerSizeItem.active ? 'is-active' : ''}
                                        title={headerSizeItem.title}
                                    >
                                        {headerSizeItem.title}
                                    </button>
                                ))}
                            </div>
                        </Menu>
                    </button>
                    <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
                        Horizontal
                    </button>
                    <button onClick={() => editor.chain().focus().setHardBreak().run()}>
                        Hard
                    </button>
                    <BackToDashboardButton />
                </div>
            </div>
        </>
    );
};

export default MenuBar;
