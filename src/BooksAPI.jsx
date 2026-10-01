
const CACHE_KEY = "myreads_local_shelves";

// Helper to get local data
const getLocalData = () => {
  const data = localStorage.getItem(CACHE_KEY);
  return data ? JSON.parse(data) : {};
};

// Helper to save local data
const setLocalData = (data) => {
  localStorage.setItem(CACHE_KEY, JSON.stringify(data));
};

export const getAll = async () => {
  const data = getLocalData();
  return Object.values(data);
};

export const update = async (book, shelf) => {
  const data = getLocalData();
  if (shelf === "none") {
    delete data[book.id];
  } else {
    data[book.id] = { ...book, shelf };
  }
  setLocalData(data);
  return data;
};

export const search = async (query) => {
  try {
    const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=20`);
    const json = await res.json();
    if (!json.items) return { error: "empty" };
    
    return json.items.map(item => ({
      id: item.id,
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors || ["Author Unlisted"],
      imageLinks: item.volumeInfo.imageLinks 
        ? { thumbnail: item.volumeInfo.imageLinks.thumbnail.replace("http:", "https:") } 
        : null,
      shelf: "none"
    }));
  } catch (err) {
    return { error: err.message };
  }
};
