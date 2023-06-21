import { configureStore } from '@reduxjs/toolkit';
import bookmarksReducer from './features/bookmarks/bookmarksSlice';
import categoriesReducer from './features/categories/categoriesSlice';

const store = configureStore({
  reducer: {
    bookmarks: bookmarksReducer,
    categories: categoriesReducer,
  },
});

export default store;
