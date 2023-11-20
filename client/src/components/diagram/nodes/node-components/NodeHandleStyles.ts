const commonStyles = {
    width: '13px',
    height: '13px',
}

const sourceStyles = {
    ...commonStyles,
    background: '#51c2b387',

};

const targetStyles = {
    ...commonStyles,
    background: '#d9acd69e',
};

const handleStyles = {
    top: {...sourceStyles, transform: 'translate(-50%, -25%)'},
    right: {...sourceStyles, transform: 'translate(25%, -150%)'},
    bottom: {...targetStyles, transform: 'translate(-50%, 25%)'},
    left: {...targetStyles, transform: 'translate(-25%, -150%)'}
};

export default handleStyles;