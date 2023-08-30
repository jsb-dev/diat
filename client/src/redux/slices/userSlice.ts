import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../interfaces/User';
import { setDiagram } from './diagramSlice';
import { setAuthState } from './authSlice';

const initialState: User = {
  email: '',
  userId: '',
  diagramId: '',
  diagram: {nodes: [], edges: []},
  authState: {isAuthenticated: false, user: {email: '', userId: ''}},
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      const userData = action.payload;
      state = userData;

      if (userData.diagram) {
        setDiagram(userData.diagram);
      }
      if (userData.authState) {
        setAuthState({
          isAuthenticated: userData.authState.isAuthenticated,
          user: userData.authState.user,
        });
      }

      return state;
    },
    clearUser: () => initialState,
  }
});

export const { setUser, clearUser } = userSlice.actions;

export const selectUser = (state: any) => state.user;

export default userSlice.reducer;
