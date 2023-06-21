import { useEffect, useRef } from 'react';
import axios from 'axios';
import Category from '../types/category';
import Bookmark from '../types/Bookmark';
import BookmarksOfCategory from './BookmarksOfCategory';
import CategorizedBookmark from '../types/CategorizedBookmark';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { addBookmarks } from '../features/bookmarks/bookmarksSlice';
import { addCategories } from '../features/categories/categoriesSlice';
import { addCategorizedBookmarks } from '../features/categorizedBookmarks/categorizedBookmarksSlice';

const AllBookmarks = () => {
  const categorizedBookmarks = useSelector(
    (state: RootState) => state.categorizedBookmarks
  );

  const fetched = useRef<boolean>(false);

  const dispatch = useDispatch();

  const fetchBookmarks = async () => {
    try {
      fetched.current = true;
      const response = await axios.get('http://localhost:3001/bookmarks');
      const bookmarksData = response.data;
      dispatch(addBookmarks(bookmarksData));

      const responseCategories = await axios.get(
        'http://localhost:3001/categories'
      );
      const categoriesData = responseCategories.data;
      dispatch(addCategories(categoriesData));

      const categorizedBookmarks = categoriesData.map((category: Category) => {
        const bookmarksInCategory = bookmarksData.filter(
          (bookmark: Bookmark) => bookmark.categoryId === category.id
        );
        return {
          ...category,
          bookmarks: bookmarksInCategory,
        };
      });

      dispatch(addCategorizedBookmarks(categorizedBookmarks));
    } catch (error) {
      console.log('Error fetch bookmarks', error);
    }
  };

  useEffect(() => {
    if (!fetched.current) fetchBookmarks();
  }, []);

  return (
    <div>
      {categorizedBookmarks ? (
        <div className='flex gap-3 flex-wrap'>
          {categorizedBookmarks.map(
            (categorizedBookmark: CategorizedBookmark, idx: number) =>
              categorizedBookmark.bookmarks.length ? (
                <BookmarksOfCategory key={idx} {...categorizedBookmark} />
              ) : null
          )}
        </div>
      ) : (
        'Loading...'
      )}
    </div>
  );
};

export default AllBookmarks;
