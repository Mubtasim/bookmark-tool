import { configureStore } from '@reduxjs/toolkit';
import bookmarksReducer from './features/bookmarks/bookmarksSlice';
import categoriesReducer from './features/categories/categoriesSlice';
import categorizedBookmarksReducer from './features/categorizedBookmarks/categorizedBookmarksSlice';
import Bookmark from './types/Bookmark';
import Category from './types/category';
import CategorizedBookmark from './types/CategorizedBookmark';

export type RootState = {
  bookmarks: Bookmark[];
  categories: Category[];
  categorizedBookmarks: CategorizedBookmark[];
};

const store = configureStore({
  reducer: {
    bookmarks: bookmarksReducer,
    categories: categoriesReducer,
    categorizedBookmarks: categorizedBookmarksReducer,
  },
});

export default store;
