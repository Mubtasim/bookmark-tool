import AddBookmark from '../components/AddBookmark';
import AllBookmarks from '../components/AllBookmarks';

const Home = () => {
  return (
    <div className='grid grid-cols-12 gap-4 p-5'>
      <div className='col-span-8 overflow-y-scroll no-scrollbar max-h-screen'>
        <AllBookmarks />
      </div>
      <div className='col-span-4'>
        <AddBookmark />
      </div>
    </div>
  );
};

export default Home;
