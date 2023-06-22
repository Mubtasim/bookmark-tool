import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import bookmarksReducer from './features/bookmarks/bookmarksSlice';
import categoriesReducer from './features/categories/categoriesSlice';
import categorizedBookmarksReducer from './features/categorizedBookmarks/categorizedBookmarksSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import Bookmark from './types/Bookmark';
import Category from './types/category';
import CategorizedBookmark from './types/CategorizedBookmark';
import { pokemonApi } from './services/pokemon';

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
    // Add the generated reducer as a specific top-level slice
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },

  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

export default store;
