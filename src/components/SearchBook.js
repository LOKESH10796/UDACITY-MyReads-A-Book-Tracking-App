import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";
import Books from "./Books";

class SearchBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      searchResults: [],
      query: ""
    };
  }

  updateQuery = event => {
    this.setState({ query: event.target.value }, this.searchBooks);
  };

  searchBooks() {
    if (this.state.query.trim() === "") {
      return this.setState({ searchResults: [] });
    }

    BooksAPI.search(this.state.query.trim()).then(retval => {
      if (retval.error) {
        return this.setState({ searchResults: [] });
      } else {
        retval.forEach(searchedBook => {
          let bookFound = this.state.books.filter(
            bookList => bookList.id === searchedBook.id
          );
          if (bookFound[0]) {
            searchedBook.shelf = bookFound[0].shelf;
          }
        });
        return this.setState({ searchResults: retval });
      }
    });
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={this.updateQuery}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchResults.length > 0 &&
              this.state.searchResults.map((books) => (
                <Books
                  updateBookShelf={this.props.updateBookShelf}
                  books={books}
                  key={books.id}
                />
              ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBook;
