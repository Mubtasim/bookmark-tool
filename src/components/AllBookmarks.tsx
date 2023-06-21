import { useEffect, useState } from 'react';
import axios from 'axios';
import Category from '../types/category';
import Bookmark from '../types/Bookmark';

const AllBookmarks = () => {
  const [bookmarks, setBookmarks] = useState(null);

  const fetchBookmarks = async () => {
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

    setBookmarks(categorizedBookmarks);
    // console.log('categorized Bookmarks', categorizedBookmarks);
    // console.log('bookmark data', bookmarksData);
    // console.log('category data', categoriesData);
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  return <div>AllBookmarks</div>;
};

export default AllBookmarks;
