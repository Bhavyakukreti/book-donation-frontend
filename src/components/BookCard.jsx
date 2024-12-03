import React from 'react';
import './BookCard.scss';

const BookCard = ({ book, onEdit, onDelete }) => {
  return (
    <div className="book-card">
      <img src={book.imageUrl || 'default-image.jpg'} alt={book.title} className="book-card-img" />
      <div className="book-card-content">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">{book.author}</p>
        <p className="book-genre">{book.genre}</p>
        <p className="book-year">{book.year}</p>
        <p className="book-isbn">{book.isbn}</p>
        <div className="card-actions">
          <button onClick={() => onEdit(book)} className="edit-btn">Edit</button>
          <button onClick={() => onDelete(book._id)} className="delete-btn">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
