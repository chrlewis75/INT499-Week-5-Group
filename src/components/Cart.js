// src/components/Cart.js
import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import './cart.css'; // Imports appropriate styles for your Cart component

const Cart = () => {
  // Access cart state and removeFromCart method from CartContext
  const { cart, removeFromCart } = useCart();

  // Check if cart is defined and has items
  if (!cart || cart.length === 0) {
    return <div className='cart-empty'>Your cart is empty.</div>;
  }

  return (
    <div className='cart'>
      <h2>Your Cart</h2>
      <ul className='cart-items'>
        {cart.map((item, index) => (
          <li key={index} className='cart-item'>
            <div className='cart-item-info'>
              {/* Displaying item details */}
              <h3>{item.service}</h3> {/* Display subscription name from data.js */}
              <p>Price: ${item.price.toFixed(2)}</p> {/* Display item price */}
              <p>Quantity: {item.amount}</p> {/* Display item quantity */}
            </div>
            {/* Button to remove item from cart */}
            <button onClick={() => removeFromCart(item.id)} className='remove-button'>
              Remove
            </button>
          </li>
        ))}
      </ul>
      {/* Button to begin purchase, redirecting to the checkout page */}
      <Link to="/checkout" className='checkout-button'>Begin Purchase</Link>
    </div>
  );
};

export default Cart;