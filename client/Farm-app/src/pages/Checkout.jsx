import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    paymentMethod: 'credit_card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.address) {
      setError('Please fill in all required fields.');
      return;
    }
    if (
      formData.paymentMethod === 'credit_card' &&
      (!formData.cardNumber || !formData.expiryDate || !formData.cvv)
    ) {
      setError('Please fill in all credit card details.');
      return;
    }

    setError('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      dispatch(clearCart());
      alert('Order placed successfully!');
      navigate('/orders');
    }, 1500);
  };

  if (cartItems.length === 0) {
    return (
      <div style={{ textAlign: 'center', marginTop: '4rem' }}>
        <h2 style={{ fontSize: '1.8rem', color: '#555' }}>Your cart is empty.</h2>
        <p style={{ color: '#777' }}>Please add items before checking out.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '1rem', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', textAlign: 'center', color: '#2c3e50' }}>Checkout</h1>

      <div style={{ marginBottom: '2rem', border: '1px solid #ccc', padding: '1.5rem', borderRadius: '10px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Order Summary</h2>
        <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1rem' }}>
          {cartItems.map(({ id, name, price, quantity }) => (
            <li key={id} style={{ marginBottom: '0.5rem', color: '#333' }}>
              {name} x {quantity} = <strong>${(price * quantity).toFixed(2)}</strong>
            </li>
          ))}
        </ul>
        <h3 style={{ color: '#2980b9' }}>Total: ${totalPrice.toFixed(2)}</h3>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Shipping Information</h2>

        <label>
          Full Name*:
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </label>

        <label>
          Address*:
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            rows="3"
            style={{ ...inputStyle, resize: 'vertical' }}
          />
        </label>

        <h2 style={{ fontSize: '1.5rem', marginTop: '1rem' }}>Payment Method</h2>
        <label style={{ marginBottom: '0.5rem' }}>
          <input
            type="radio"
            name="paymentMethod"
            value="credit_card"
            checked={formData.paymentMethod === 'credit_card'}
            onChange={handleChange}
          />{" "}
          Credit Card
        </label>

        {formData.paymentMethod === 'credit_card' && (
          <>
            <label>
              Card Number*:
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                maxLength={16}
                required
                style={inputStyle}
              />
            </label>

            <label>
              Expiry Date* (MM/YY):
              <input
                type="text"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                placeholder="MM/YY"
                maxLength={5}
                required
                style={inputStyle}
              />
            </label>

            <label>
              CVV*:
              <input
                type="password"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                maxLength={3}
                required
                style={inputStyle}
              />
            </label>
          </>
        )}

        {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            backgroundColor: '#27ae60',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            transition: 'background 0.3s ease',
          }}
        >
          {isSubmitting ? 'Placing Order...' : 'Place Order'}
        </button>
      </form>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '0.5rem',
  marginTop: '0.25rem',
  borderRadius: '4px',
  border: '1px solid #ccc',
  fontSize: '1rem',
  marginBottom: '0.75rem',
};

export default Checkout;
