import React from 'react'
import Book from './Book'

class BookList extends React.Component {
  state = {

  };

  componentDidMount () {
    console.log(this.props.bookList)
  }

  render () {
    return (
      <div className="bookshelf-books">
        <ol className="books-grid">
          {this.props.bookList.map((book) => (
            <li>
             <Book />
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

export default BookList