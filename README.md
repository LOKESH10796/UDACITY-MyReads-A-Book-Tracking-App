# ?? MyReads Library Manager

![React](https://img.shields.io/badge/React-18.x-blue?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-8.x-purple?style=for-the-badge&logo=vite)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

MyReads is a React-based bookshelf app that allows you to select and categorize books you have read, are currently reading, or want to read. The project emphasizes using React to build the UI and provides an API server and client library that you will use to persist information as you interact with the application.

## ?? Features

*   **Categorization:** Organize books into 'Currently Reading', 'Want to Read', and 'Read'.
*   **Book Search:** Search for new books from an external API and add them to your shelves.
*   **State Management:** Complex React state handling across multiple components.
*   **Routing:** Integrated with React Router for seamless navigation between the bookshelf and search pages.

## ??? Architecture

*   **React Context/State:** Minimal prop drilling, leveraging modern React architecture.
*   **BooksAPI:** Handles asynchronous \GET\ and \PUT\ requests to sync shelf status.

## ?? Setup & Deployment

1. **Install Dependencies:** \
pm install\
2. **Run Development Server:** \
pm run start\

## ?? License

This project is licensed under the MIT License.
