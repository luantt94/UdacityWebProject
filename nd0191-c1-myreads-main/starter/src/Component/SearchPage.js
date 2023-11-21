import Search from "./Search";
import { useNavigate } from "react-router-dom";

const SearchPage = ({ books, updateBookState, updateQuery }) => {
  const navigate = useNavigate();

  const handleCloseSearch = () => {
    updateQuery("");
    navigate("/");
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <a className="close-search" onClick={handleCloseSearch}>
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
      <Search books={books} updateBookState={updateBookState} />
      <div className="search-books-results">
        <ol className="books-grid"></ol>
      </div>
    </div>
  );
};

export default SearchPage;
