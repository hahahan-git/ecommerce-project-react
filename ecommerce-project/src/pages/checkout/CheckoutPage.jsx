import './CheckoutPage.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { CheckoutHeader } from './CheckoutHeader'
import { OrderSummary } from './OrderSummary'
import { PaymentSummary } from './PaymentSummary'

export function CheckoutPage({ cart, loadCart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  const getDeliveryOptionsData = async () => {
    let response = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime');
    setDeliveryOptions(response.data);
  }

  const getPaymentSummaryData = async () => {
    const response = await axios.get('/api/payment-summary');
    setPaymentSummary(response.data);
  }

  useEffect(() => {
    getDeliveryOptionsData();
  }, []);

  useEffect(() => {
    getPaymentSummaryData();
  }, [cart]);

  return (
    <>
      <title>Checkout</title>

      <CheckoutHeader paymentSummary={paymentSummary} cart={cart} />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary cart={cart} deliveryOptions={deliveryOptions} loadCart={loadCart} />
          <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
        </div>
      </div>
    </>
  )
}