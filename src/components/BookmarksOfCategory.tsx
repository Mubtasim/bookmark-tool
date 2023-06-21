import { Link } from 'react-router-dom';
import Bookmark from '../types/Bookmark';
import CategorizedBookmark from '../types/CategorizedBookmark';

const BookmarksOfCategory = ({ name, bookmarks }: CategorizedBookmark) => {
  return (
    <div className='w-2/5'>
      <div className='font-semibold mb-3'>Category {name}</div>
      <div className='py-4 px-2 bg-gray-500 flex flex-col gap-2 rounded-sm items-center justify-center'>
        {bookmarks.map((bookmark: Bookmark, idx: number) => (
          <div
            className='w-full flex bg-white rounded-sm p-2 justify-between items-center'
            key={idx}
          >
            <div>{bookmark.title}</div>
            <Link
              to={`/bookmarks/${bookmark.id}`}
              className='bg-pink-500 p-2 text-white rounded-md'
            >
              Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookmarksOfCategory;
