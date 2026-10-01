import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";
import Books from "./Books";

function SearchBook({ books, updateBookShelf }) {
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let active = true;

    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }

    BooksAPI.search(query.trim()).then(retval => {
      if (!active) return;
      if (retval.error) {
        setSearchResults([]);
      } else {
        retval.forEach(searchedBook => {
          let bookFound = books.find(b => b.id === searchedBook.id);
          if (bookFound) {
            searchedBook.shelf = bookFound.shelf;
          } else {
            searchedBook.shelf = "none";
          }
        });
        setSearchResults(retval);
      }
    });

    return () => {
      active = false;
    };
  }, [query, books]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      <div className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/" className="p-2 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <div className="flex-1 relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-100 border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all shadow-inner text-slate-800"
            />
          </div>
        </div>
      </div>
      <div className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        {searchResults.length === 0 && query.trim() !== "" ? (
          <div className="text-center text-slate-400 mt-12 font-medium">No books found for "{query}"</div>
        ) : (
          <ol className="flex flex-wrap gap-8 justify-center sm:justify-start">
            {searchResults.map((book) => (
              <Books
                updateBookShelf={updateBookShelf}
                books={book}
                key={book.id}
              />
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}

export default SearchBook;
