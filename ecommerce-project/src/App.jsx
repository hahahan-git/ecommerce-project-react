import axios from 'axios';
import { Routes, Route } from 'react-router';
import { HomePage } from './pages/home/HomePage';
import { CheckoutPage } from './pages/checkout/CheckoutPage';
import { OrderPage } from './pages/order/OrderPage';
import { TrackingPage } from './pages/tracking/TrackingPage';
import { NotFoundPage } from './pages/404/404Page';
import { useEffect, useState } from 'react';


function App() {
  window.axios = axios;
  const [cart, setCart] = useState([]);

  const loadCart = async () => {
    const response = await axios.get('/api/cart-items?expand=product');
    setCart(response.data);
  }
  const addToCart = async (productId, quantity) => {
    await axios.post('/api/cart-items', {
      productId: productId,
      quantity: quantity || 1
    });
    await loadCart()
  }
  useEffect(() => {
    loadCart();
  }, [])
  return (
    <Routes>
      <Route index element={<HomePage cart={cart} loadCart={loadCart} addToCart={addToCart} />} />
      <Route path='checkout' element={<CheckoutPage cart={cart} loadCart={loadCart} />} />
      <Route path='order' element={<OrderPage cart={cart} addToCart={addToCart} />} />
      <Route path='tracking/:orderId/:productId' element={<TrackingPage cart={cart} />} />
      <Route path='*' element={<NotFoundPage cart={cart} />} />

    </Routes>
  )
}

export default App
