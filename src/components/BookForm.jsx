import React, { useState, useEffect } from "react";
import axios from "axios";
import './BookForm.scss';

const BookForm = ({ onAddBook, onEditBook, book }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    year: "",
    isbn: "",
    imageUrl: "",
  });

  // If editing a book, populate the form with the existing book's data
  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title,
        author: book.author,
        genre: book.genre,
        year: book.year,
        isbn: book.isbn,
        imageUrl: book.imageUrl,
      });
    }
  }, [book]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (book) {
        // If editing an existing book, update it
        const response = await axios.put(
          `http://localhost:5000/books/${book._id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        onEditBook(response.data.book); // Update parent component with the edited book
      } else {
        // If adding a new book, create it
        const response = await axios.post(
          "http://localhost:5000/books/add",
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        onAddBook(response.data.book); // Update parent component with the new book
      }

      setFormData({
        title: "",
        author: "",
        genre: "",
        year: "",
        isbn: "",
        imageUrl: "",
      });
      alert(book ? "Book updated successfully!" : "Book added successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to add/update book.");
    }
  };

  return (
    <div className="book-form-container">
      <h2>{book ? "Edit Book" : "Add a New Book"}</h2>
      <form onSubmit={handleSubmit} className="book-form">
        <input
          type="text"
          name="title"
          placeholder="Book Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="genre"
          placeholder="Genre"
          value={formData.genre}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="year"
          placeholder="Year of Publication"
          value={formData.year}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="isbn"
          placeholder="ISBN"
          value={formData.isbn}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="imageUrl"
          placeholder="Book Image URL"
          value={formData.imageUrl}
          onChange={handleChange}
        />
        <button type="submit" className="submit-btn">
          {book ? "Update Book" : "Add Book"}
        </button>
      </form>
    </div>
  );
};

export default BookForm;
