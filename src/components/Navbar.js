// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext'; // Import useAuth hook
import { useNavigate } from 'react-router-dom'; // Use navigate for redirection
import './Navbar.css';
import imageCart from '../images/imageCart.png';
import imageContact from '../images/imageContact.png';
import imageLogin from '../images/imageLogin.png'; // This button will now be used for both login and logout
import imageHome from '../images/imageHome.png';
import imageMovie from '../images/imageMovie.png';
import imageVideoSearch from '../images/imageVideoSearch.png';
import imageGrade from '../images/imageGrade.png';
import imageSubscriptions from '../images/imageSubscriptions.png';
import imageMoviesPage from '../images/imageTheater.png';

const Navbar = () => {
  // Retrieve cart items from the CartContext
  const { cart } = useCart();

  // Ensure cart is defined and default to an empty array if not
  const totalItems = (cart || []).reduce((sum, item) => sum + item.amount, 0); // Calculate total items

  // Access isAuthenticated and logout
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleAuthButtonClick = () => {
    if (isAuthenticated) {
      logout(); // Log the user out
      navigate('/login'); // Redirect to login page after logout
    } else {
      navigate('/login'); // Redirect to login page if not authenticated
    }
  };

  return (
    <nav>
      <nav className='navbar'>
        <ul className='navbar-list'>
          <li>
            <Link to="/">
              <img src={imageHome} alt="StreamList" className='navbar-icon' /> StreamList Home
            </Link>
          </li>
          <li>
            <Link to="/MoviesPage">
              <img src={imageMoviesPage} alt="Popular Movies" className='navbar-icon' /> Popular Movies
            </Link>
          </li>
          <li>
            <Link to="/movies">
              <img src={imageMovie} alt="Movies" className='navbar-icon' /> My Movies
            </Link>
          </li>
          <li>
            <Link to="/subscriptions">
              <img src={imageSubscriptions} alt="Subscriptions" className='navbar-icon' /> Subscriptions
            </Link>
          </li>
          <li>
            <Link to="/cart">
              <img src={imageCart} alt="Cart" className='navbar-icon' /> Cart ({totalItems})
            </Link>
          </li>
          <li>
            <a href="https://www.imdb.com/?ref_=nv_home" target="_blank" rel="noopener noreferrer"> 
              <img src={imageVideoSearch} alt="IMDB Website" className='navbar-icon' /> IMDb Website
            </a>
          </li>
          <li>
            <a href="https://www.rottentomatoes.com/" target="_blank" rel="noopener noreferrer">
              <img src={imageGrade} alt="RottenTomatoes" className='navbar-icon' /> Movie Reviews
            </a>
          </li>
          <li>
            <Link to="/about">
              <img src={imageContact} alt="About" className='navbar-icon' /> About
            </Link>
          </li>
          <li>
            <button onClick={handleAuthButtonClick} className="navbar-link-button">
              <img src={imageLogin} alt={isAuthenticated ? "Logout" : "Login"} className='navbar-icon' />
              {isAuthenticated ? "Logout" : "Login"}
            </button>
          </li>
        </ul>
      </nav>
    </nav>
  );
};

export default Navbar;
