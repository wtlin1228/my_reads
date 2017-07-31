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
    list_in_shelf: [],
    list_search: []
  };

  componentDidMount () {
    BooksAPI.getAll().then((result) => this.setState({
      list_in_shelf: result
    }))
  }

  handleUpdateReadingMode = (book, mode) => {
    BooksAPI.update(book, mode);

    this.setState((prevState) => ({
      list_in_shelf: prevState.list_in_shelf.map((book_in_shelf) => {
        if (book_in_shelf === book) {
          book.shelf = mode;
          return book
        }
        return book_in_shelf
      })
    }))
  };

  render() {
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
              <BookList
                list_book={this.state.list_in_shelf}
                onModeChange={this.handleUpdateReadingMode}
              />
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
                    list_book={this.state.list_in_shelf.filter((book) => (book.shelf === 'currentlyReading'))}
                    onModeChange={this.handleUpdateReadingMode}
                  />
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <BookList
                    list_book={this.state.list_in_shelf.filter((book) => (book.shelf === 'wantToRead'))}
                    onModeChange={this.handleUpdateReadingMode}
                  />
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <BookList
                    list_book={this.state.list_in_shelf.filter((book) => (book.shelf === 'read'))}
                    onModeChange={this.handleUpdateReadingMode}
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
