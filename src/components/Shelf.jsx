import React from 'react'
import Books from './Books'

function Shelf({ name, books, updateBookShelf }) {
  return (
    <div className="bg-white/50 dark:bg-slate-800/50 rounded-2xl shadow-xl border border-slate-200 dark:border-white/10 overflow-hidden backdrop-blur-sm">
      <div className="bg-white/80 dark:bg-slate-800/80 px-6 py-5 border-b border-slate-200 dark:border-white/10">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 tracking-wide flex items-center gap-2">
          <div className="w-2 h-6 bg-emerald-500 dark:bg-emerald-400 rounded-full"></div>
          {name}
        </h2>
      </div>
      <div className="p-8">
        <ol className="flex flex-wrap gap-8 justify-center sm:justify-start">
          {books.map((book) => <Books updateBookShelf={updateBookShelf} books={book} key={book.id} />)}
        </ol>
      </div>
    </div>
  )
}

export default Shelf