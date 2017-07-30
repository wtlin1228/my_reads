import React from 'react'
import Book from './Book'

class BookList extends React.Component {
  state = {

  };


  render () {
    return (
      <div className="bookshelf-books">
        <ol className="books-grid">
          {this.props.list_book.map((book, index) => (
            <li key={index}>
             <Book
               title={book.title}
               author={book.authors[0]}
               readingStatus={book.shelf}
               Img={book.imageLinks.smallThumbnail}
             />
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

export default BookList