import axios from 'axios'
import { useNavigate } from 'react-router';
import { formatMoney } from "../../utils/money"

export function PaymentSummary({ paymentSummary, loadCart }) {
  const navigate = useNavigate();
  const createOrder = async () => {
    await axios.post('/api/orders');
    await loadCart();
    // langsung redirect ke order page
    navigate('/order'); // bukan asynchronous
  }
  return (
    <>
      <div className="payment-summary">
        <div className="payment-summary-title">
          Payment Summary
        </div>

        {paymentSummary && (
          <>
            <div className="payment-summary-row"
              data-testid='items-row'>
              <div>Items ({paymentSummary.totalItems}):</div>
              <div className="payment-summary-money">{formatMoney(paymentSummary.productCostCents)}</div>
            </div>

            <div className="payment-summary-row"
              data-testid='shiping-handling-row'>
              <div>Shipping &amp; handling:</div>
              <div className="payment-summary-money">{formatMoney(paymentSummary.shippingCostCents)}</div>
            </div>

            <div className="payment-summary-row subtotal-row"
              data-testid='total-before-tax-row'>
              <div>Total before tax:</div>
              <div className="payment-summary-money">{formatMoney(paymentSummary.totalCostBeforeTaxCents)}</div>
            </div>

            <div className="payment-summary-row"
              data-testid='estimated-tax-row'>
              <div>Estimated tax (10%):</div>
              <div className="payment-summary-money">{formatMoney(paymentSummary.taxCents)}</div>
            </div>

            <div className="payment-summary-row total-row"
              data-testid='order-total-row'>
              <div>Order total:</div>
              <div className="payment-summary-money">{formatMoney(paymentSummary.totalCostCents)}</div>
            </div>

            <button className="place-order-button button-primary" onClick={createOrder}
            data-testid='place-order-btn'>
              Place your order
            </button>
          </>
        )}
      </div>
    </>
  )
}