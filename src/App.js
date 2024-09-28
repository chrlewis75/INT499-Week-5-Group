// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from './components/Navbar'; // Importing Navbar component
import Home from './pages/Home'; // Importing Home page component
import Login from './pages/Login'; // Importing Login page component
import Movies from './pages/Movies'; // Importing Movies page component
import Cart from './components/Cart'; // Importing Cart component
import About from './pages/About'; // Importing About page component
import Subscriptions from './pages/Subscriptions'; // Importing Subscriptions page component
import { CartProvider } from './context/CartContext'; // Importing CartProvider for context management
import './App.css'; // Importing global styles
import Checkout from './pages/Checkout'; // Importing Checkout page component
import MoviesPage from './pages/MoviesPage'; // Importing Movies Page for TMDB import
import CreditCardForm from './components/CreditCardForm'; // Importing the credit card form
import { AuthProvider } from '../src/context/AuthContext'; // Added AuthProvider and useAuth import
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute

function App() {
  return (
    <Router>
      <AuthProvider> {/* Provide authentication context */}
        <CartProvider> {/* Provide cart context */}
          <Navbar /> {/* Navbar component */}
          <Routes>
            {/* Define routes for different pages */}
            <Route 
              path="/"
              element={
                  <Home />
              }
            /> {/* Home page - Accessible to the public */} 
            <Route path="/login" element={<Login />} /> {/* Login page */}
            <Route 
              path="/movies" 
              element={
                <ProtectedRoute>
                  <Movies />
                </ProtectedRoute>
              }
            /> {/* Movies page */}
            <Route
              path="/subscriptions"
              element={
                <ProtectedRoute>
                  <Subscriptions />
                </ProtectedRoute>
              }
            /> {/* Subscriptions page */}
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            /> {/* Cart page */}
            <Route
              path="/about"
              element={
                <ProtectedRoute>
                  <About />
                </ProtectedRoute>
              }
            /> {/* About page */}
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            /> {/* Checkout page */}
            <Route
              path="/moviespage"
              element={
                <ProtectedRoute>
                  <MoviesPage />
                </ProtectedRoute>
              }
            /> {/* Popular Movies Page */}
            <Route
              path="/credit-card"
              element={
                <ProtectedRoute>
                  <CreditCardForm />
                </ProtectedRoute>
              }
            /> {/* Credit Card Form Page */}
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
