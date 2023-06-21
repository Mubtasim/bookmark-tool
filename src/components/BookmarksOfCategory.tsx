import Bookmark from '../types/Bookmark';
import CategorizedBookmark from '../types/CategorizedBookmark';

const BookmarksOfCategory = ({ name, bookmarks }: CategorizedBookmark) => {
  return (
    <div className=''>
      <div className='font-semibold mb-3'>Category {name}</div>
      <div className='py-4 px-2 bg-gray-500'>
        {bookmarks.map((bookmark: Bookmark) => (
          <div className='flex bg-white gap-10 p-2 items-center'>
            <div>{bookmark.title}</div>
            <button className='bg-pink-500 p-2 text-white rounded-md'>
              Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookmarksOfCategory;
