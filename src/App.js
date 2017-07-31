import React from 'react'
import { Route, Link } from 'react-router-dom'
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
    list_search: [],
    search_options: ['Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'History', 'History', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Program Javascript', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS']
  };

  componentDidMount () {
    BooksAPI.getAll().then((result) => this.setState({
      list_in_shelf: result
    }))
  }

  handleSearchChange = (e) => {
    if (this.state.search_options.includes(e.target.value)) {
      console.log(e.target.value);
      BooksAPI.search(e.target.value, 20).then((result) => this.setState({
        list_search: result
      }))
    }

  };

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

  handleAddBook = (book, mode) => {
    BooksAPI.update(book, mode);

    book.shelf = mode;
    this.setState({
      list_in_shelf: this.state.list_in_shelf.concat(book)
    })
  };

  render() {
    return (
      <div className="app">
        <Route exact path="/search" render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search">Shelf</Link>
              <div className="search-books-input-wrapper">
                {/* 
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" onChange={this.handleSearchChange}/>
                
              </div>
            </div>
            <div className="search-books-results">
              <BookList
                list_book={this.state.list_search}
                onModeChange={this.handleAddBook}
              />
            </div>
          </div>
        )}/>
        <Route exact path="/" render={() => (
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
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
