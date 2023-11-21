import "./App.css";
import { useState } from "react";
import { getAll, update, get, search } from "./BooksAPI";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Component/HomePage";
import SearchPage from "./Component/SearchPage";

function App() {
  const [bookshelf, setBookshelf] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const updateQuery = (query) => {
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

  const updateBookState = async (id, newShelf) => {
    update(id, newShelf);
    if (!bookshelf.find((book) => book.id === id)) {
      const newBook = await get(id);

      setBookshelf([...bookshelf, newBook]);
    } else {
      setBookshelf(
        bookshelf.map((book) =>
          book.id === id ? { ...book, shelf: newShelf } : book
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
    <Routes>
      <Route
        exact
        path="/"
        element={
          <HomePage bookshelf={bookshelf} updateBookState={updateBookState} />
        }
      />
      <Route
        path="/search"
        element={
          <SearchPage
            books={searchResults}
            updateBookState={updateBookState}
            updateQuery={updateQuery}
          />
        }
      />
    </Routes>
  );
}

export default App;
