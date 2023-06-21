import { useState } from 'react';
import axios from 'axios';
import Category from '../types/category';

const AddBookmark = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  const toggleNewCategoryInput = () => {
    setShowNewCategoryInput(!showNewCategoryInput);
  };

  const saveNewCategory = async () => {
    try {
      const response = await axios.post('http://localhost:3001/categories', {
        name: newCategory,
      });
      setCategories([...categories, response.data]);
      setCategory(response.data.id.toString());
      setNewCategory('');
      setShowNewCategoryInput(false);
    } catch (error) {
      console.log('Error saving new category:', error);
    }
  };

  // Fetch categories from JSON server
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3001/categories');
      setCategories(response.data);
    } catch (error) {
      console.log('Error fetching categories:', error);
    }
  };

  // Save the bookmark to the JSON server
  const saveBookmark = async () => {
    try {
      if (!(title && url && category)) {
        console.log('Please fill all the input');
        return;
      }
      const newBookmark = {
        title,
        url,
        categoryId: parseInt(category),
      };
      await axios.post('http://localhost:3001/bookmarks', newBookmark);
      // Reset form values and close modal
      setTitle('');
      setUrl('');
      setCategory('');
      setIsModalOpen(false);
    } catch (error) {
      console.log('Error saving bookmark:', error);
    }
  };

  const handleModalOpen = () => {
    setIsModalOpen(!isModalOpen);
    fetchCategories(); // Fetch categories when the modal opens
  };

  return (
    <div className='flex flex-col items-end'>
      <button
        className='bg-blue-800 text-white p-2 rounded-sm w-1/3 text-sm'
        onClick={handleModalOpen}
      >
        Create Bookmark
      </button>
      {isModalOpen && (
        <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50'>
          <div className='bg-white p-4 rounded shadow'>
            <h2 className='text-lg font-bold mb-4'>Add Bookmark</h2>
            <input
              type='text'
              placeholder='Title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='w-full border border-gray-300 rounded px-2 py-1 mb-2'
            />
            <input
              type='text'
              placeholder='URL'
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className='w-full border border-gray-300 rounded px-2 py-1 mb-2'
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className='w-full border border-gray-300 rounded px-2 py-1 mb-2'
            >
              <option value=''>Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id.toString()}>
                  {category.name}
                </option>
              ))}
            </select>
            <button
              onClick={toggleNewCategoryInput}
              className='bg-blue-500 text-white px-2 py-1 rounded-sm mr-2'
            >
              {showNewCategoryInput ? 'X' : 'Add Category'}
            </button>
            {showNewCategoryInput && (
              <div>
                <input
                  type='text'
                  placeholder='New Category'
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className='w-full border border-gray-300 rounded px-2 py-1 my-2'
                />
                <button
                  onClick={saveNewCategory}
                  className='bg-green-500 text-white px-4 py-1 rounded-sm'
                >
                  Save
                </button>
              </div>
            )}
            <button
              onClick={saveBookmark}
              className='bg-blue-800 text-white px-4 py-2 rounded-sm'
            >
              Add Bookmark
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddBookmark;
