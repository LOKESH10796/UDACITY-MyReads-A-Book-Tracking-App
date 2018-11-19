import React from 'react'
import { Route } from 'react-router-dom'
import SearchBook from './components/SearchBook'
import MainPage from './components/MainPage'
import * as BooksAPI from "./BooksAPI";
import './App.css'

class BooksApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
  }

  componentDidMount() {
    BooksAPI.getAll().then(retval => {
      this.setState({ books: retval });
    });
  }

  updateBookShelf = (books, shelf) => {
    BooksAPI.update(books, shelf).then(() => {
      books.shelf = shelf;
      this.setState(state => ({
        books: state.books.filter(by => by.id !== books.id).concat([books])
      }));
    });
  };

  render() {
    return (
      <div>
        <Route exact path="/" render ={()=>(
        <MainPage updateBookShelf={this.updateBookShelf} books={this.state.books}/>
        )}/>

        <Route exact path="/Search" render ={()=>(
        <SearchBook updateBookShelf={this.updateBookShelf} books={this.state.books}/>
        )}/>
      </div>

    )
  }
}

export default BooksApp
