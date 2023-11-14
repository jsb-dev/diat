export const textFieldStyle = {
    '& label.Mui-focused': {
        color: '#51c2b3',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#51c2b3',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'white',
        },
        '&:hover fieldset': {
            borderColor: '#9ce9e9',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#51c2b3',
        },
        '& input': {
            color: 'white',
            '&:hover': {
                color: '#9ce9e9',
            },
            '&:focus': {
                color: '#51c2b3',
            },
        },
    },
};
