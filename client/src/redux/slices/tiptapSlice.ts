import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TiptapState {
    editorIsOpen: boolean;
    documentUpdates: Array<{ id: string; content: any; callback?: () => void }>;}

const initialState: TiptapState = {
    editorIsOpen: false,
    documentUpdates: [],
};

const tiptapSlice = createSlice({
    name: 'tiptap',
    initialState,
    reducers: {
        toggleEditor: (state) => {
            state.editorIsOpen = !state.editorIsOpen;
        },
        updateDocContent: (
            state,
            action: PayloadAction<{
              id: string;
              content: any;
            }>
          ) => {
            const { id, content } = action.payload;
            state.documentUpdates.push({ id, content });
          },
        removeProcessedDocUpdate: (state, action: PayloadAction<string>) => {
            state.documentUpdates = state.documentUpdates.filter(update => update.id !== action.payload);
        }
        
    },
});

export const { toggleEditor, updateDocContent, removeProcessedDocUpdate } = tiptapSlice.actions;
export default tiptapSlice.reducer;