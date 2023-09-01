import { createSlice } from '@reduxjs/toolkit';

interface EditorState {
    editorIsOpen: boolean;
}

const initialState: EditorState = {
    editorIsOpen: false,
};

const editorSlice = createSlice({
    name: 'editor',
    initialState,
    reducers: {
        toggleEditor: (state) => {
            state.editorIsOpen = !state.editorIsOpen;
        },
    },
});

export const { toggleEditor } = editorSlice.actions;
export default editorSlice.reducer;
