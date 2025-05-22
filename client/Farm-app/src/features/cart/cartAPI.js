const API_BASE_URL = 'http://localhost:5000'; // Replace with your backend URL

export async function submitCart(cartItems, token) {
  const res = await fetch(`${API_BASE_URL}/cart/checkout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ items: cartItems }),
  });
  if (!res.ok) throw new Error('Checkout failed');
  return res.json();
}
