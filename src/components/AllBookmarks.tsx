import { useEffect, useState } from 'react';
import axios from 'axios';
import Category from '../types/category';
import Bookmark from '../types/Bookmark';
import BookmarksOfCategory from './BookmarksOfCategory';
import CategorizedBookmark from '../types/CategorizedBookmark';

const AllBookmarks = () => {
  const [categorizedBookmarks, setCategorizedBookmarks] = useState<
    CategorizedBookmark[] | null
  >(null);

  const fetchBookmarks = async () => {
    try {
      const response = await axios.get('http://localhost:3001/bookmarks');
      const bookmarksData = response.data;

      const responseCategories = await axios.get(
        'http://localhost:3001/categories'
      );
      const categoriesData = responseCategories.data;

      const categorizedBookmarks = categoriesData.map((category: Category) => {
        const bookmarksInCategory = bookmarksData.filter(
          (bookmark: Bookmark) => bookmark.categoryId === category.id
        );
        console.log('bookmarks in category', bookmarksInCategory);
        return {
          ...category,
          bookmarks: bookmarksInCategory,
        };
      });

      setCategorizedBookmarks(categorizedBookmarks);
      console.log('categorized Bookmarks', categorizedBookmarks);
      // console.log('bookmark data', bookmarksData);
      // console.log('category data', categoriesData);
    } catch (error) {
      console.log('Error fetch bookmarks', error);
    }
  };

  useEffect(() => {
    fetchBookmarks();
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
