import Shelf from "./Shelf";
import { useNavigate } from "react-router-dom";

const HomePage = ({ bookshelf, updateBookState }) => {
  const navigate = useNavigate();
  return (
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
        <a onClick={() => navigate("/search")}>Add a book</a>
      </div>
    </div>
  );
};

export default HomePage;
