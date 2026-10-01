import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import SearchBook from './components/SearchBook'
import MainPage from './components/MainPage'
import * as BooksAPI from "./BooksAPI";


function BooksApp() {
  const [books, setBooks] = useState([])

  useEffect(() => {
    BooksAPI.getAll().then(retval => {
      setBooks(retval);
    });
  }, [])

  const updateBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      book.shelf = shelf;
      setBooks(prevBooks => prevBooks.filter(by => by.id !== book.id).concat([book]));
    });
  };

  return (
    <div>
      <Routes>
        <Route exact path="/" element={<MainPage updateBookShelf={updateBookShelf} books={books}/>} />
        <Route exact path="/Search" element={<SearchBook updateBookShelf={updateBookShelf} books={books}/>} />
      </Routes>
    </div>
  )
}

export default BooksApp
