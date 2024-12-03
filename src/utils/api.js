import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api',
});

// Set Authorization header for authenticated requests
export const setAuthToken = (token) => {
    if (token) {
        API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete API.defaults.headers.common['Authorization'];
    }
};

// Auth APIs
export const loginUser = (credentials) => API.post('/auth/login', credentials);
export const registerUser = (data) => API.post('/auth/register', data);

// Book APIs
export const fetchBooks = () => API.get('/books');
export const addBook = (bookData) => API.post('/books', bookData);
export const updateBook = (id, bookData) => API.put(`/books/${id}`, bookData);
export const deleteBook = (id) => API.delete(`/books/${id}`);
