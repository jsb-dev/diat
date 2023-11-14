import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { User } from '@/interfaces/User';
import { setDiagram } from './flowSlice';
import { setAuthState } from './authSlice';

const initialState: User = {
  email: '',
  userId: '',
  diagramId: '',
  diagram: { nodes: [], edges: [] },
  authState: { isAuthenticated: false, user: { email: '', userId: '' } },
};

export const getCachedUserCredentials = async (): Promise<User | null> => {
  const cache = await caches.open('diagram-cache');
  const cachedResponse = await cache.match('/diagram');
  if (cachedResponse) {
    return cachedResponse.json();
  }
  return null;
};

export const getCachedAuthState = (): any => {
  const savedAuthState = Cookies.get('diat-auth');
  return savedAuthState ? JSON.parse(savedAuthState) : null;
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      const { diagram, authState, ...restOfUserData } = action.payload;
    
      const typedRestOfUserData: Partial<User> = restOfUserData;
    
      // Loop over keys
      for (const key of Object.keys(initialState)) {
        if (typedRestOfUserData.hasOwnProperty(key)) {
          const typedKey = key as keyof User;
          
          // Update state
          state[typedKey] = typedRestOfUserData[typedKey] as any;
        }
      }
    
      if (diagram) {
        setDiagram(diagram);
      }
    
      if (authState) {
        setAuthState(authState);
      }
    },    
    
    clearUser: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(setDiagram, (state, action) => {
        state.diagram = action.payload;
      })
      .addCase(setAuthState, (state, action) => {
        state.authState = action.payload;
      });
  },
});

export const { setUser, clearUser } = userSlice.actions;

export const selectUser = (state: any) => state.user;

export default userSlice.reducer;
