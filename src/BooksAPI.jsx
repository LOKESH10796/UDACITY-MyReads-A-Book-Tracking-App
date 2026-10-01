
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
    const res = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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'
      },
      body: JSON.stringify({
        model: 'nvidia/nemotron-4-340b-instruct',
        messages: [
          {
            role: 'system',
            content: `You are a strict JSON API backend for a library manager. 
            The user will provide a search query. 
            You must respond ONLY with a raw JSON array of 10 fictional or real book objects matching the query. No markdown formatting, no backticks, just the JSON array.
            Format of each object:
            {
              "id": "<generate-a-unique-random-string>",
              "title": "<Book Title>",
              "authors": ["<Author 1>", "<Author 2>"],
              "imageLinks": {
                "thumbnail": "https://loremflickr.com/128/193/book,cover,art?lock=<use-the-same-unique-random-string-here>"
              },
              "shelf": "none"
            }`
          },
          {
            role: 'user',
            content: `Search query: ${query}`
          }
        ],
        temperature: 0.5,
        max_tokens: 2000,
      })
    });

    const data = await res.json();
    if (!data.choices || data.choices.length === 0) return { error: "empty" };
    
    // Extract JSON from LLM response (in case it added backticks despite instructions)
    let content = data.choices[0].message.content;
    content = content.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const parsedBooks = JSON.parse(content);
    return parsedBooks;
    
  } catch (err) {
    return { error: err.message };
  }
};
