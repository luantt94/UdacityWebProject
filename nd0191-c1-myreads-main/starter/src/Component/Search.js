import Book from "./Book";

const Search = ({ books, updateBookState }) => {
  if (books.length === 0 || books[0].error) {
    return <> </>;
  }

  return (
    <>
      <div className="bookshelf">
        <h2 className="bookshelf-title">Currently Reading</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) => (
              <li key={book.id}>
                <Book
                  shelf={book.shelf}
                  author={book.authors}
                  title={book.title}
                  img={
                    book.imageLinks !== undefined &&
                    book.imageLinks.thumbnail !== undefined
                      ? book.imageLinks.thumbnail
                      : ""
                  }
                  id={book.id}
                  updateBookState={updateBookState}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
};

export default Search;
