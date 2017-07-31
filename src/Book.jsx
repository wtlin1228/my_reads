import React from 'react'
import PropTypes from 'prop-types'

class Book extends React.Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    onModeChange: PropTypes.func.isRequired
  };

  handleChange = (event) => {
    if (this.props.onModeChange)
      this.props.onModeChange(this.props.book, event.target.value)
  };

  render () {
    const book = this.props.book;
    const authors = book.authors ? book.authors : [];

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
          <div className="book-shelf-changer">
            <select value={book.shelf} onChange={this.handleChange}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{authors.join(', ')}</div>
      </div>
    );
  }
}

export default Book