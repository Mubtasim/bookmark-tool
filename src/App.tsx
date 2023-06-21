import 'typeface-poppins';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BookmarkDetails from './components/BookmarkDetails';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='bookmarks/:id' element={<BookmarkDetails />} />
        </Routes>
        <Home />;
      </BrowserRouter>
    </div>
  );
}

export default App;
