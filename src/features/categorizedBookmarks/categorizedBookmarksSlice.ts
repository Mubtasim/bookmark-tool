import { createSlice } from '@reduxjs/toolkit';
import CategorizedBookmark from '../../types/CategorizedBookmark';

const initialState: CategorizedBookmark[] = [];

const categorizedBookmarksSlice = createSlice({
  name: 'categorizedBookmarks',
  initialState,
  reducers: {
    addCategorizedBookmark: (state, action) => {
      // state.push(action.payload);
      const categoryId = action.payload.categoryId;
      state.forEach((categorizedBookmark: CategorizedBookmark) => {
        if (categorizedBookmark.id === categoryId)
          categorizedBookmark.bookmarks.push(action.payload);
      });
    },
    addCategorizedBookmarks: (state, action) => {
      return [...state, ...action.payload];
    },
  },
});

export const { addCategorizedBookmark, addCategorizedBookmarks } =
  categorizedBookmarksSlice.actions;

export default categorizedBookmarksSlice.reducer;
