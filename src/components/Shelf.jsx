import React from 'react'
import Books from './Books'

function Shelf({ name, books, updateBookShelf }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-100">
        <h2 className="text-xl font-bold text-slate-800">{name}</h2>
      </div>
      <div className="p-6">
        <ol className="flex flex-wrap gap-8 justify-center sm:justify-start">
          {books.map((book) => <Books updateBookShelf={updateBookShelf} books={book} key={book.id} />)}
        </ol>
      </div>
    </div>
  )
}

export default Shelf