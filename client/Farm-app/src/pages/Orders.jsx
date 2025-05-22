import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrders } from '../features/orders/orderSlice';
import './Orders.css';

const Orders = () => {
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.orders.list);
  const status = useSelector((state) => state.orders.status);
  const error = useSelector((state) => state.orders.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchOrders());
    }
  }, [status, dispatch]);

  if (status === 'loading') return <p className="loading">Loading orders...</p>;
  if (status === 'failed') return <p className="error">Error: {error}</p>;

  if (orders.length === 0) {
    return <p className="no-orders">You have no past orders.</p>;
  }

  return (
    <div className="orders-container">
      <h1 className="orders-title">My Orders</h1>

      {orders.map((order) => (
        <div key={order.id} className="order-card">
          <h2 className="order-id">Order #{order.id}</h2>
          <p><strong>Date:</strong> {new Date(order.created_at).toLocaleDateString()}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>

          <div className="order-items">
            <h3>Items:</h3>
            <ul>
              {order.items.map(({ id, name, quantity, price }) => (
                <li key={id} className="order-item">
                  {name} x {quantity} = ${(price * quantity).toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
