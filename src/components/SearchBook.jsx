import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";
import Books from "./Books";

function SearchBook({ books, updateBookShelf }) {
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    let active = true;

    if (query.trim() === "") {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    // Debounce the API call to prevent 429 Too Many Requests
    const delayDebounceFn = setTimeout(() => {
      BooksAPI.search(query.trim()).then(retval => {
        if (!active) return;
        setIsSearching(false);
        if (retval.error) {
          setSearchResults([]);
        } else {
          retval.forEach(searchedBook => {
            // Force thumbnail to ensure it always renders properly
            if (!searchedBook.imageLinks) searchedBook.imageLinks = {};
            // Generate a random ID if LLM didn't provide one
            if (!searchedBook.id || searchedBook.id.includes('<')) searchedBook.id = Math.random().toString(36).substring(2, 9);
            searchedBook.imageLinks.thumbnail = `https://loremflickr.com/128/193/book,cover,art?lock=${searchedBook.id}`;
            
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
    }, 600); // 600ms delay

    return () => {
      active = false;
      clearTimeout(delayDebounceFn);
    };
  }, [query, books]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a] font-sans flex flex-col text-slate-900 dark:text-slate-200 transition-colors duration-300">
      <div className="bg-white/80 dark:bg-slate-900/80 shadow-2xl sticky top-0 z-50 backdrop-blur-xl border-b border-slate-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-5 flex items-center gap-5">
          <Link to="/" className="p-2.5 text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <div className="flex-1 relative group">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 group-focus-within:text-emerald-500 dark:group-focus-within:text-emerald-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search millions of books..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 rounded-2xl focus:bg-slate-50 dark:focus:bg-slate-800 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all shadow-inner text-slate-900 dark:text-slate-100 text-lg placeholder-slate-400 dark:placeholder-slate-500 outline-none"
            />
          </div>
        </div>
      </div>
      <div className="flex-1 max-w-7xl mx-auto px-4 py-10 w-full">
        {isSearching ? (
          <div className="text-center mt-20">
            <div className="inline-block w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-6"></div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-300">Searching global library...</h3>
          </div>
        ) : searchResults.length === 0 && query.trim() !== "" ? (
          <div className="text-center mt-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-white/5 mb-6 shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-slate-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-300">No books found</h3>
            <p className="text-slate-500 mt-2 text-lg">We couldn't find anything for "{query}"</p>
          </div>
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
