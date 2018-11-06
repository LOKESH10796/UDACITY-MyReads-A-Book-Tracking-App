import React from 'react'
import { Route } from 'react-router-dom'
import SearchBook from './components/SearchBook'
import MainPage from './components/MainPage'
import './App.css'

class BooksApp extends React.Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={MainPage}/>
        <Route exact path="/Search" component={SearchBook}/>
      </div>

    )
  }
}

export default BooksApp
