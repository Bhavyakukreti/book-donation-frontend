import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider
import Layout from './layouts/Layout'; // Layout component
import HomePage from './pages/HomePage';  // HomePage component
import AboutPage from './pages/AboutPage';  // AboutPage component
import LoginPage from './pages/LoginPage';  // LoginPage component
import Register from './pages/Register';
import MainPage from "./pages/MainPage";
import './styles/global.scss'; // Import global styles

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>  {/* Parent layout route */}
            <Route index element={<HomePage />} />  {/* Default HomePage */}
            <Route path="about" element={<AboutPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />  {/* Login Page */}
          <Route path="/register" element={<Register />} />
          <Route path="/main" element={<MainPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
