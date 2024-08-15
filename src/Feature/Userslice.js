// src/Feature/Userslice.js

import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    language: 'en', // Default language
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
    },
    login(state, action) {
      state.user = action.payload;
    },
    changeLanguage(state, action) {
      state.language = action.payload;
    },
  },
});

export const { setUser, logout, login, changeLanguage } = userSlice.actions;
export const selectUser = (state) => state.user.user;
export const selectLanguage = (state) => state.user.language; // Add a selector for language if needed

export default userSlice.reducer;
