import AddBookmark from '../components/AddBookmark';
import AllBookmarks from '../components/AllBookmarks';
import BookmarkDetails from '../components/BookmarkDetails';

const Home = () => {
  return (
    <div className='grid grid-cols-12 gap-4 p-5'>
      <div className='col-span-8'>
        <AllBookmarks />
      </div>
      <div className='col-span-4'>
        <AddBookmark />
        <BookmarkDetails />
      </div>
    </div>
  );
};

export default Home;
