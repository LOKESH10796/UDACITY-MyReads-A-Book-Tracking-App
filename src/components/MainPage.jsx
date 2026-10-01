import React from "react";
import { Link } from "react-router-dom";
import Shelf from "./Shelf";

function MainPage({ updateBookShelf, books }) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a] font-sans text-slate-900 dark:text-slate-200 transition-colors duration-300">
      {/* Header */}
      <div className="bg-white/80 dark:bg-slate-900/60 py-6 px-8 shadow-xl sticky top-0 z-50 flex items-center justify-between backdrop-blur-xl border-b border-slate-200 dark:border-white/5">
        <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-600 dark:from-emerald-400 dark:to-cyan-400 tracking-wider flex items-center gap-3 drop-shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          MyReads
        </h1>
        <Link 
          to="/Search" 
          className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white dark:text-slate-900 px-6 py-2.5 rounded-full font-bold transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] hover:scale-105"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Explore Library
        </Link>
      </div>
      
      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-10 space-y-12">
        <Shelf
          updateBookShelf={updateBookShelf}
          name="Currently Reading"
          books={books.filter(by => by.shelf === "currentlyReading")}
        />
        <Shelf
          updateBookShelf={updateBookShelf}
          name="Want to Read"
          books={books.filter(by => by.shelf === "wantToRead")}
        />
        <Shelf
          updateBookShelf={updateBookShelf}
          name="Read"
          books={books.filter(by => by.shelf === "read")}
        />
      </div>
    </div>
  );
}

export default MainPage;
