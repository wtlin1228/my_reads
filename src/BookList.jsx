import React from 'react'
import Book from './Book'

class BookList extends React.Component {
  handleModeChange  = (book, mode) => {
    this.props.onModeChange(book, mode)
  };

  render () {
    return (
      <div className="bookshelf-books">
        <ol className="books-grid">
          {this.props.list_book.map((book) => (
            <li key={book.id}>
             <Book
               book={book}
               onModeChange={this.handleModeChange}
             />
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

export default BookList