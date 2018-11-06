import React, { Component } from 'react'

class Books extends Component {
  render () {
    return(
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${this.props.books.imageLinks ? this.props.books.imageLinks.thumbnail : ""}")`}}></div>
            <div className="book-shelf-changer">
              <select value ={this.props.books.shelf || "none"} onChange= {(event) =>{this.props.updateBookShelf(this.props.books, event.target.value)} }>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{this.props.books.title}</div>
          <div className="book-authors">{this.props.books.authors ? this.props.books.authors[0] : "Author Unlisted" }</div>
        </div>
      </li>
    )
  }
}

export default Books