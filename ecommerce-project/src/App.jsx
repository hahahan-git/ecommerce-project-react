import { Routes, Route } from 'react-router'
import { HomePage } from './pages/HomePage'
import { CheckoutPage } from './pages/checkout/CheckoutPage'
import {OrderPage} from './pages/order/OrderPage'
import { TrackingPage } from './pages/tracking/TrackingPage'

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path='checkout' element={<CheckoutPage />} />
      <Route path='order' element={<OrderPage />} />
      <Route path='tracking' element={<TrackingPage />} />
    </Routes>
  )
}

export default App
