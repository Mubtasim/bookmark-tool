import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Bookmark from '../types/Bookmark';

const BookmarkDetails = () => {
  const [bookmark, setBookmark] = useState<Bookmark | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookmark = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/bookmarks/${id}`
        );
        setBookmark(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBookmark();
  }, [id]);
  return (
    <div className='absolute right-10 bottom-10 w-80 bg-pink-500 p-2 rounded-sm flex flex-col items-center'>
      <h2 className='text-white font-bold mb-4'>Bookmark Details</h2>
      <div className='bg-white rounded-sm p-2 w-full flex flex-col mb-3'>
        <div className='mb-5'>
          <span className='font-semibold inline'>Title:</span> {bookmark?.title}
        </div>
        <div className='mb-5'>
          <span className='font-semibold inline'>URL:</span> {bookmark?.url}
        </div>
        <div>
          <span className='font-semibold inline'>Category:</span>{' '}
          {bookmark?.categoryId}
        </div>
      </div>
      <button onClick={() => navigate(-1)} className='bg-white rounded-sm p-2'>
        Back
      </button>
    </div>
  );
};

export default BookmarkDetails;
