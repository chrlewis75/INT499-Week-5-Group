// src/components/CreditCardForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './CreditCardForm.css';

const CreditCardForm = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const { isAuthenticated } = useAuth(); // Get authentication from AuthContext
  const navigate = useNavigate(); // Router hook for navigation

  useEffect(() => {
    // Load card information from localStorage, if available
    const savedCard = localStorage.getItem('maskedCardNumber');
    const savedExpiry = localStorage.getItem('expiryDate');
    if (savedCard) {
        setCardNumber(savedCard);
    }
    if (savedExpiry) {
        setExpiryDate(savedExpiry);
    }
  }, []);

  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\D/g, ''); // Remove all non-digit characters
    const match = cleaned.match(/.{1,4}/g); // Group numbers in groups of four
    return match ? match.join(' ') : '';
  };

  const maskedCardNumber = (cardNumber) => {
    const cleaned = cardNumber.replace(/\D/g, ''); // Clean card number
    const lastFour = cleaned.slice(-4); // Gets last four digits
    return '**** **** **** ' + lastFour; // Mask the card number
  };

  const handleCardNumberChange = (e) => {
    setCardNumber(formatCardNumber(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
        alert("You need to be logged in to save your card information.");
        navigate('/login');
        return;
    }

    // Mask the card number and save to localStorage
    const masked = maskedCardNumber(cardNumber);

    // Save card data to localStorage
    localStorage.setItem('creditCard', JSON.stringify({
        cardNumber: masked,
        expiryDate,
    }));

    alert("Credit card information saved successfully for future use.");

    // Redirect back to checkout page
    navigate('/checkout');
  };

  return (
    <div className="credit-card-container">
      <h2>Enter Credit Card Information</h2>
      <form onSubmit={handleSubmit} className='credit-card-form'>
        <div className="form-group">
          <label>Card Number</label>
          <input
            type="text"
            value={cardNumber}
            onChange={handleCardNumberChange}
            placeholder="1234 5678 9012 3456"
            maxLength="19"
            required
          />
        </div>
        <div className='form-group'>
          <label>Expiry Date (MM/YY)</label>
          <input
            type="text"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            placeholder="MM/YY"
            required
          />
        </div>
        <div className='form-group'>
          <label>CVV</label>
          <input
            type="text"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            placeholder="CVV"
            maxLength="3"
            required
          />
        </div>
        <button type="submit" className="complete-purchase-button">
            Save Card
        </button>
      </form>
    </div>
  );
};

export default CreditCardForm;
