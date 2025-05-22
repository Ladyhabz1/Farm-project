import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>Your cart is empty.</h2>
        <p>Add some animals to your cart to get started.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '900px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Your Cart</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={thStyle}>Animal</th>
            <th style={thStyle}>Price (per unit)</th>
            <th style={thStyle}>Quantity</th>
            <th style={thStyle}>Subtotal</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(({ id, name, price, quantity }) => (
            <tr key={id} style={{ textAlign: 'center' }}>
              <td style={tdStyle}>{name}</td>
              <td style={tdStyle}>${price.toFixed(2)}</td>
              <td style={tdStyle}>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(id, Number(e.target.value))}
                  style={{ width: '60px', padding: '5px', border: '1px solid #ccc', borderRadius: '4px' }}
                />
              </td>
              <td style={tdStyle}>${(price * quantity).toFixed(2)}</td>
              <td style={tdStyle}>
                <button
                  onClick={() => handleRemove(id)}
                  style={removeBtnStyle}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ textAlign: 'right', marginTop: '30px' }}>
        <h3>Total: ${totalPrice.toFixed(2)}</h3>
        <button onClick={handleCheckout} style={checkoutBtnStyle}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

// Inline styles
const thStyle = {
  borderBottom: '2px solid #ccc',
  padding: '12px',
  textAlign: 'left'
};

const tdStyle = {
  padding: '10px',
  borderBottom: '1px solid #eee'
};

const removeBtnStyle = {
  backgroundColor: '#dc2626',
  color: '#fff',
  padding: '8px 12px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

const checkoutBtnStyle = {
  marginTop: '15px',
  backgroundColor: '#16a34a',
  color: '#fff',
  padding: '12px 20px',
  border: 'none',
  borderRadius: '6px',
  fontSize: '16px',
  cursor: 'pointer'
};

export default Cart;
