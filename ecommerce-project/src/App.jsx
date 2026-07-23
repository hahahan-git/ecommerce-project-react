import axios from 'axios';
import { Routes, Route } from 'react-router';
import { HomePage } from './pages/home/HomePage';
import { CheckoutPage } from './pages/checkout/CheckoutPage';
import { OrderPage } from './pages/order/OrderPage';
import { TrackingPage } from './pages/tracking/TrackingPage';
import { NotFoundPage } from './pages/404/404Page';
import { useEffect, useState } from 'react';

function App() {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    axios.get('/api/cart-items?expand=product')
      .then((response) => {
        setCart(response.data);
      })
  }, [])
  return (
    <Routes>
      <Route index element={<HomePage cart={cart} />} />
      <Route path='checkout' element={<CheckoutPage cart={cart} />} />
      <Route path='order' element={<OrderPage cart={cart}/>} />
      <Route path='tracking' element={<TrackingPage />} />
      <Route path='*' element={<NotFoundPage />} />

    </Routes>
  )
}

export default App
