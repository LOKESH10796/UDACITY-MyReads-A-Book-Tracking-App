import React from 'react'

function Books({ books, updateBookShelf }) {
  const { imageLinks, shelf, title, authors } = books;
  return (
    <li className="w-40 flex flex-col group">
      <div className="relative h-60 rounded-lg shadow-md overflow-hidden transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-xl bg-slate-200">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: `url("${imageLinks ? imageLinks.thumbnail : ""}")`}}
        ></div>
        
        {/* Dropdown container */}
        <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-emerald-500 rounded-full shadow-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110 cursor-pointer overflow-hidden z-10">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white pointer-events-none absolute" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
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
      
      <div className="mt-4 flex flex-col flex-1">
        <h3 className="font-bold text-slate-800 text-sm leading-tight line-clamp-2" title={title}>{title}</h3>
        <p className="text-slate-500 text-xs mt-1 line-clamp-1">{authors ? authors.join(', ') : "Author Unlisted"}</p>
      </div>
    </li>
  )
}

export default Books