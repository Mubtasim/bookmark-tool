import Bookmark from './Bookmark';

type CategorizedBookmark = {
  id: number;
  name: string;
  bookmarks: Bookmark[];
};

export default CategorizedBookmark;
