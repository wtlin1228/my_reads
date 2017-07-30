import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookList from './BookList'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: true,
    book_list: [{title: '1'}, {title: '2'}, {title: '3'}],
    list_current_reading: [],
    list_want_to_read: [],
    list_read: []
  };

  componentDidMount () {
    BooksAPI.getAll().then((result) => this.setState({
      list_current_reading: result.filter((book) => (book.shelf === 'currentlyReading')),
      list_want_to_read: result.filter((book) => (book.shelf === 'wantToRead')),
      list_read: result.filter((book) => (book.shelf === 'read'))
    }))
  }

  render() {
    console.log(this.state.list_current_reading)
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/* 
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>
                
              </div>
            </div>
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
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <BookList
                    list_book={this.state.list_current_reading}
                  />
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <BookList
                    list_book={this.state.list_want_to_read}
                  />
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <BookList
                    list_book={this.state.list_read}
                  />
                </div>
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
