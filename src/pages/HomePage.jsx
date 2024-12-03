import React, { useState, useEffect } from "react";
import axios from "axios";
import BookCard from "../components/BookCard"; // Import the BookCard component
import './HomePage.scss'
const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch books with pagination
  const fetchBooks = async (page = 1) => {
    try {
      const response = await axios.get("http://localhost:5000/books", {
        params: { page, limit: 5 },
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

  useEffect(() => {
    fetchBooks(currentPage);
  }, [currentPage]);

  return (
    <div className="homepage">
      <header className="homepage-header">
        <h1>Welcome to the Book Donation App</h1>
        <p>Explore books and manage your collection!</p>

        {/* Login and Register Links */}
        <div className="auth-links">
          <button onClick={() => window.location.href = "/login"} className="auth-btn">Login</button>
          <button onClick={() => window.location.href = "/register"} className="auth-btn">Register</button>
        </div>
      </header>

      {/* Book Cards */}
      <section className="book-cards-container">
        {books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </section>

      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-btn"
        >
          Previous
        </button>
        <span className="pagination-info">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-btn"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default HomePage;
