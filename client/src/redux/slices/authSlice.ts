import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { setUser } from './userSlice';
import Cookies from 'js-cookie';

export const initializeAuth = createAsyncThunk(
    'auth/initialize',
    async (_, { dispatch, getState }) => {
      const state: any = getState();
      if (!state.auth.isAuthenticated) {
        const savedAuthState = Cookies.get('diat-auth');
        if (savedAuthState) {
          const { isAuthenticated, user } = JSON.parse(savedAuthState);
          dispatch(setAuthState({ isAuthenticated, user }));
        }
      }
    }
  );

interface AuthState {
  isAuthenticated: boolean;
  user: any;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthState: (state, action: PayloadAction<{ isAuthenticated: boolean, user: any }>) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;

      Cookies.set('diat-auth', JSON.stringify({ isAuthenticated: action.payload.isAuthenticated, user: action.payload.user }));

      console.log("Auth state updated and Cookie set to:", Cookies.get('diat-auth'));
    },
    clearAuthState: state => {
      state.isAuthenticated = false;
      state.user = null;
      Cookies.remove('diat-auth');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(setUser, (state, action) => {
        if (action.payload.authState) {
          state.isAuthenticated = action.payload.authState.isAuthenticated;
          state.user = action.payload.authState.user;
          Cookies.set('diat-auth', JSON.stringify(action.payload.authState));
          console.log("Auth state updated from setUser and Cookie set to:", Cookies.get('diat-auth'));
        }
      })
  }
});

export const { setAuthState, clearAuthState } = authSlice.actions;

export const selectAuth = (state: any) => state.auth;

export default authSlice.reducer;
