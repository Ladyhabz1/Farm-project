import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  // Container is fixed to top, left-aligned
  const navStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    backgroundColor: '#2f855a',
    color: '#fff',
    padding: '12px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '1rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    zIndex: 1000,
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    fontWeight: 500,
  };

  const brandStyle = {
    fontSize: '1.25rem',
    fontWeight: 700,
    color: 'white',
    textDecoration: 'none',
    marginRight: '2rem',
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    padding: '6px 8px',
    borderRadius: '4px',
    transition: 'background-color 0.2s',
  };

  const buttonStyle = {
    backgroundColor: '#f56565',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '6px 12px',
    cursor: 'pointer',
    fontWeight: 600,
    transition: 'background-color 0.2s',
  };

  // Hover handlers
  const onLinkHover = (e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)';
  const onLinkLeave = (e) => e.currentTarget.style.backgroundColor = 'transparent';

  const onBtnHover = (e) => e.currentTarget.style.backgroundColor = '#c53030';
  const onBtnLeave = (e) => e.currentTarget.style.backgroundColor = '#f56565';

  return (
    <nav style={navStyle}>
      <Link to="/" style={brandStyle}>
        Meat Market
      </Link>

      <Link
        to="/animals"
        style={linkStyle}
        onMouseEnter={onLinkHover}
        onMouseLeave={onLinkLeave}
      >
        Animals
      </Link>

      {user?.role === 'farmer' && (
        <>
          <Link
            to="/add-animal"
            style={linkStyle}
            onMouseEnter={onLinkHover}
            onMouseLeave={onLinkLeave}
          >
            Add Animal
          </Link>
          <Link
            to="/orders"
            style={linkStyle}
            onMouseEnter={onLinkHover}
            onMouseLeave={onLinkLeave}
          >
            Orders
          </Link>
        </>
      )}

      {user?.role === 'user' && (
        <>
          <Link
            to="/cart"
            style={linkStyle}
            onMouseEnter={onLinkHover}
            onMouseLeave={onLinkLeave}
          >
            Cart ({cart.length})
          </Link>
          <Link
            to="/checkout"
            style={linkStyle}
            onMouseEnter={onLinkHover}
            onMouseLeave={onLinkLeave}
          >
            Checkout
          </Link>
        </>
      )}

      {!user && (
        <>
          <Link
            to="/login"
            style={linkStyle}
            onMouseEnter={onLinkHover}
            onMouseLeave={onLinkLeave}
          >
            Login
          </Link>
          <Link
            to="/register"
            style={linkStyle}
            onMouseEnter={onLinkHover}
            onMouseLeave={onLinkLeave}
          >
            Register
          </Link>
        </>
      )}

      {user && (
        <>
          <span style={{ marginLeft: '2rem', fontSize: '0.9rem' }}>
            Hi, {user.username}
          </span>
          <button
            onClick={handleLogout}
            style={buttonStyle}
            onMouseEnter={onBtnHover}
            onMouseLeave={onBtnLeave}
          >
            Logout
          </button>
        </>
      )}
    </nav>
  );
};

export default Navbar;
