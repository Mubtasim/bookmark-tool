import { createSlice } from '@reduxjs/toolkit';
import Category from '../../types/category';

const initialState: Category[] = [];

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state, action) => {
      state.push(action.payload);
    },
    addCategories: (state, action) => {
      return [...state, ...action.payload];
    },
  },
});

export const { addCategory, addCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;
