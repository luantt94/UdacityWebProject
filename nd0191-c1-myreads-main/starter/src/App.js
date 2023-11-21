import "./App.css";
import { useState } from "react";
import { getAll, update, get, search } from "./BooksAPI";
import { useEffect } from "react";
import Shelf from "./Component/Shelf";
import { Route, Routes } from "react-router-dom";
import Search from "./Component/Search";

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [bookshelf, setBookshelf] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState("");

  const updateQuery = (query) => {
    setQuery(query);
    searchBooks(query.toLowerCase());
  };

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
      newBook.shelf = newShelf;
      setBookshelf([...bookshelf, newBook]);
    } else {
      setBookshelf(
        bookshelf.map((book) =>
          book.id === bookId ? { ...book, shelf: newShelf } : book
        )
      );
    }
  };
  const searchBooks = async (query) => {
    if (query.length > 0) {
      const response = await search(query);
      const books = Array.isArray(response) ? response : [response];
      books.map((book) => {
        const bookInShelf = bookshelf.find((b) => b.id === book.id);
        book.shelf = bookInShelf !== undefined ? bookInShelf.shelf : "none";
      });

      setSearchResults(books);
    } else {
      setSearchResults([]);
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
                onChange={(event) => updateQuery(event.target.value)}
              />
            </div>
          </div>
          <Search books={searchResults} updateBookState={updateBookState} />
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
