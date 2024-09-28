import React from 'react';
import list from '../components/data'; // Import the subscription data
import { useCart } from '../context/CartContext'; // For hook
import './Subscriptions.css'; // Styling for the page
import { useNavigate } from 'react-router-dom'; // For redirection

const Subscriptions = () => {
  const { addToCart, error } = useCart(); // Get the addToCart function and error state
  const navigate = useNavigate(); // Hook for navigation

  const handleAddToCart = (subscription) => {
    // Add item to cart
    addToCart(subscription);

  // Redirect to cart page once subscription is added to the cart
  navigate('/cart');
  };

  return (
    <div className="subscriptions-container">
      <h1>Choose Your Subscription</h1>

      {/* Error message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="subscription-list">
        {list.map((subscription) => (
          <div key={subscription.id} className="subscription-card">
            <img src={subscription.img} alt={subscription.service} />
            <h2>{subscription.service}</h2>
            <p>{subscription.serviceInfo}</p>
            <p>${subscription.price.toFixed(2)} / month</p>
            <button onClick={() => handleAddToCart(subscription)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscriptions;
