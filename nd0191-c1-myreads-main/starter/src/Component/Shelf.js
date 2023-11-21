import Book from "./Book";

const Shelf = ({ bookshelf, updateBookState }) => {
  console.log("props");
  console.log(bookshelf);
  const currentlyReading = bookshelf.filter(
    (b) => b.shelf == "currentlyReading"
  );
  const wantToRead = bookshelf.filter((b) => b.shelf == "wantToRead");
  const read = bookshelf.filter((b) => b.shelf == "read");
  console.log("currentlyReading");
  console.log(currentlyReading);
  return (
    <>
      <div className="bookshelf">
        <h2 className="bookshelf-title">Currently Reading</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {currentlyReading.map((book) => (
              <li key={book.title}>
                <Book
                  author={book.authors}
                  title={book.title}
                  img={book.imageLinks.thumbnail}
                  id={book.id}
                  updateBookState={updateBookState}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
      <div className="bookshelf">
        <h2 className="bookshelf-title">Want to Read</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {wantToRead.map((book) => (
              <li key={book.title}>
                <Book
                  author={book.authors}
                  title={book.title}
                  img={book.imageLinks.thumbnail}
                  id={book.id}
                  updateBookState={updateBookState}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
      <div className="bookshelf">
        <h2 className="bookshelf-title">Read</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {read.map((book) => (
              <li key={book.title}>
                <Book
                  author={book.authors}
                  title={book.title}
                  img={book.imageLinks.thumbnail}
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

export default Shelf;
