import { createSlice } from '@reduxjs/toolkit';
import Bookmark from '../../types/Bookmark';

const initialState: Bookmark[] = [];

const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    addBookmark: (state, action) => {
      state.push(action.payload);
    },
    addBookmarks: (state, action) => {
      return [...state, ...action.payload];
    },
  },
});

export const { addBookmark, addBookmarks } = bookmarksSlice.actions;

export default bookmarksSlice.reducer;
