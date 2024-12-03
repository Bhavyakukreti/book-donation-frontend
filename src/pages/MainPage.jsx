import React, { useState, useEffect } from "react";
import axios from "axios";
import BookCard from "../components/BookCard"; // Import BookCard component
import BookForm from "../components/BookForm"; // Import BookForm component (for adding books)

const MainPage = () => {
  const [books, setBooks] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isBookFormVisible, setIsBookFormVisible] = useState(false); // Toggle visibility of BookForm
  const [editingBook, setEditingBook] = useState(null); // To hold the book being edited

  // Fetch books with pagination
  const fetchBooks = async (page = 1) => {
    try {
      const response = await axios.get("http://localhost:5000/books", {
        params: { page, limit: 6 },
      });
      setBooks(response.data.books);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    fetchBooks(newPage);
  };

  // Add a new book to the state
  const handleAddBook = (newBook) => {
    setBooks([newBook, ...books]);
  };

  // Delete a book
  const handleDeleteBook = async (bookId) => {
    try {
      await axios.delete(`http://localhost:5000/books/${bookId}`);
      setBooks(books.filter((book) => book._id !== bookId)); // Remove the deleted book from the state
      alert("Book deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete book.");
    }
  };

  // Edit a book (Set the editingBook state to the selected book)
  const handleEditBook = (book) => {
    setEditingBook(book);
    setIsBookFormVisible(true); // Show the form for editing
  };

  // Update the book after editing
  const handleUpdateBook = async (updatedBook) => {
    try {
      await axios.put(`http://localhost:5000/books/${updatedBook._id}`, updatedBook);
      setBooks(books.map((book) => (book._id === updatedBook._id ? updatedBook : book))); // Update the book in the list
      setEditingBook(null); // Reset the editingBook state
      setIsBookFormVisible(false); // Hide the form
      alert("Book updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update book.");
    }
  };

  useEffect(() => {
    fetchBooks(currentPage); // Load books when the component mounts
  }, [currentPage]);

  return (
    <div className="main-page">
      <h1>Books</h1>

      {/* Only show the form for adding/editing books if the user is authenticated */}
      {localStorage.getItem("token") && (
        <button onClick={() => setIsBookFormVisible(!isBookFormVisible)}>
          {isBookFormVisible ? "Hide Book Form" : "Show Book Form"}
        </button>
      )}

      {isBookFormVisible && (
        <BookForm
          onAddBook={handleAddBook}
          onEditBook={handleUpdateBook} // Pass the handleUpdateBook function for editing
          book={editingBook} // Pass the book being edited (for populating the form)
        />
      )}

      {/* Display books in card format */}
      <section className="book-cards-container">
        {books.map((book) => (
          <BookCard
            key={book._id}
            book={book}
            onDelete={handleDeleteBook}
            onEdit={handleEditBook} // Pass the handleEditBook function for editing
          />
        ))}
      </section>

      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MainPage;
