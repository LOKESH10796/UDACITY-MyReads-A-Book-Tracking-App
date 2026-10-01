import React from 'react'

function Books({ books, updateBookShelf }) {
  const { imageLinks, shelf, title, authors } = books;
  return (
    <li className="w-44 flex flex-col group">
      <div className="relative h-64 rounded-xl shadow-lg overflow-hidden transition-all duration-300 group-hover:-translate-y-3 group-hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.3)] bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-white/5">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" 
          style={{ backgroundImage: `url("${imageLinks ? imageLinks.thumbnail : "https://via.placeholder.com/128x193.png?text=No+Cover"}")`}}
        ></div>
        
        {/* Gradient Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Dropdown container */}
        <div className="absolute bottom-2 right-2 w-12 h-12 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.5)] flex items-center justify-center transition-transform duration-300 group-hover:scale-110 cursor-pointer overflow-hidden z-10 border-2 border-white dark:border-slate-900">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-slate-900 pointer-events-none absolute" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
          <select 
            value={shelf || "none"} 
            onChange={(event) => updateBookShelf(books, event.target.value)}
            className="w-full h-full opacity-0 cursor-pointer absolute inset-0 z-20"
          >
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      
      <div className="mt-5 flex flex-col flex-1 px-1">
        <h3 className="font-bold text-slate-800 dark:text-slate-200 text-[15px] leading-tight line-clamp-2 drop-shadow-sm" title={title}>{title}</h3>
        <p className="text-emerald-600 dark:text-emerald-400 text-xs mt-1.5 font-medium line-clamp-1">{authors ? (Array.isArray(authors) ? authors.join(', ') : authors) : "Author Unlisted"}</p>
      </div>
    </li>
  )
}

export default Books