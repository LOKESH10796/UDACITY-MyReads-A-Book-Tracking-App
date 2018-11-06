import React, { Component } from 'react'
import Books from './Books'

class Shelf extends Component {
    render () {
    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.name}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map((books) => <Books updateBookShelf= {this.props.updateBookShelf} books={books} key={books.id} />)}
          </ol>
        </div>
      </div>
    )
  }
}

export default Shelf