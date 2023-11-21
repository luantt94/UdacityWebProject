import "./App.css";
import { useState } from "react";
import Book from "./Component/Book";
import { getAll, update, get } from "./BooksAPI";
import { useEffect } from "react";
import Shelf from "./Component/Shelf";

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [bookshelf, setBookshelf] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const getShelfBooks = async () => {
      const response = await getAll();
      const dataArray = Array.isArray(response) ? response : [response];
      setBookshelf(dataArray);
    };

    getShelfBooks();
  }, []);

  const updateBookState = async (bookId, newShelf) => {
    update(bookId, newShelf);

    if (!bookshelf.find((book) => book.id === bookId)) {
      const newBook = await get(bookId);
      setBookshelf([...bookshelf, newBook]);
    } else {
      setBookshelf(
        bookshelf.map((book) =>
          book.id === bookId ? { ...book, shelf: newShelf } : book
        )
      );
    }
  };

  return (
    <div className="app">
      {showSearchPage ? (
        <div className="search-books">
          <div className="search-books-bar">
            <a
              className="close-search"
              onClick={() => setShowSearchpage(!showSearchPage)}
            >
              Close
            </a>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid"></ol>
          </div>
        </div>
      ) : (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <Shelf bookshelf={bookshelf} updateBookState={updateBookState} />
            </div>
          </div>
          <div className="open-search">
            <a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
