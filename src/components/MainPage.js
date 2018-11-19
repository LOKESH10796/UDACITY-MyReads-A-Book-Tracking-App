import React, { Component } from "react";
import { Link } from "react-router-dom";
import Shelf from "./Shelf";

class MainPage extends Component {

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Shelf
              updateBookShelf={this.props.updateBookShelf}
              name="Currently Reading"
              books={this.props.books.filter(
                by => by.shelf === "currentlyReading"
              )}
            />
            <Shelf
              updateBookShelf={this.props.updateBookShelf}
              name="Want to Read"
              books={this.props.books.filter(by => by.shelf === "wantToRead")}
            />
            <Shelf
              updateBookShelf={this.props.updateBookShelf}
              name="Read"
              books={this.props.books.filter(by => by.shelf === "read")}
            />
          </div>
        </div>
        <div className="open-search">
          <Link to="/Search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default MainPage;
