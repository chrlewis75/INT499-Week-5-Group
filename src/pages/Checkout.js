// src/pages/Checkout.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Checkout.css'; // import appropriate styles

const Checkout = () => {
  const { cart, clearCart } = useCart(); // Access cart and clearCart method from CartContext
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [creditCard, setCreditCard] = useState(null); // Store credit card details
  const navigate = useNavigate(); // Navigation hook

  useEffect(() => {
    // Get credit card information from localStorage
    const savedCard = localStorage.getItem('creditCard');
    if (savedCard) {
      setCreditCard(JSON.parse(savedCard));
    }
}, []);

  const handleCompletePurchase = () => {
    if (!creditCard) {
      alert('Please enter your credit card information first.');
      navigate('/credit-card'); // Navigate to enter credit card info
      return;
    }

    // Clear the cart after purchase
    clearCart();

    // Set confirmation message
    setConfirmationMessage('Thank you for your purchase! Your order has been confirmed.');

    // Clear the saved credit card info
    localStorage.removeItem('creditCard');

    // Redirect to subscription page once purchase is completed
    setTimeout(() => {
      navigate('/subscriptions');
    }, 2000); // Delay so user can see confirmation message
  };

  return (
    <div className='checkout'>
      <h2>Checkout</h2>
      <ul className='checkout-items'>
        {cart.map((item, index) => (
          <li key={index} className='checkout-item'>
            <div className='checkout-item-info'>
              <h3>{item.service}</h3> {/* Display subscription name from data.js */}
              <p>Price: ${item.price.toFixed(2)}</p>
              <p>Quantity: {item.amount}</p>
            </div>
          </li>
        ))}
      </ul>

      {/* Show credit card information if available */}
      {creditCard ? (
        <div className='credit-card-info'>
          <h3>Saved Credit Card</h3>
          <p>Card Number: {creditCard.cardNumber}</p>
          <p>Expiry Date: {creditCard.expiryDate}</p>
        </div>
      ) : (
        <Link to='/credit-card'>
          <button className='complete-purchase-button'>Enter Credit Card Information</button>
        </Link>
      )}

      {/* Wrapper for buttons */}
      <div className='checkout-buttons'>
        {/* Complete purchase button */}
        <button onClick={handleCompletePurchase} className='complete-purchase-button'>
          Complete Purchase
        </button>
      </div>  

      {confirmationMessage && <p className='confirmation-message'>{confirmationMessage}</p>}
    </div>
  );
};

export default Checkout;
