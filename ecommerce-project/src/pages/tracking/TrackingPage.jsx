import './TrackingPage.css'
import axios from 'axios';
import dayjs from 'dayjs';
import { Header } from '../../components/Header'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react';

export function TrackingPage({ cart }) {
  const { orderId, productId } = useParams();
  const [order, setOrder] = useState(null)
  useEffect(() => {
    const getTrackingData = async () => {
      const response = await axios.get(`/api/orders/${orderId}?expand=products`);
      setOrder(response.data)
    }
    getTrackingData();

  }, [orderId])


  const orderTrack = order && order.products.find((orderTrack) => {
    return orderTrack.productId === productId
  })

  const totalDeliveryTimeMs = order && orderTrack.estimatedDeliveryTimeMs - order.orderTimeMs

  const timePassedMs = order && dayjs(orderTrack.estimatedDeliveryTimeMs).valueOf() - order.orderTimeMs;

  const deliveryPercent = (timePassedMs / totalDeliveryTimeMs) * 100
  const isPreparing = deliveryPercent < 33;
  const isShipped = deliveryPercent >= 33 && deliveryPercent < 100;
  const isDelivered = deliveryPercent >= 100;


  return (order &&
    <>
      <link rel="icon" href="tracking-favicon.png" />
      <title>Tracking Page</title>


      <Header cart={cart} />
      <div className="tracking-page">
        <div className="order-tracking">
          <a className="back-to-orders-link link-primary" href="/order">
            {'<'}
          </a>

          <div className="delivery-date">
            {deliveryPercent >= 100 ? 'Delivered on' : 'Arriving on'} {dayjs(orderTrack.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
          </div>

          <div className="product-info">
            {orderTrack.product.name}
          </div>

          <div className="product-info">
            Quantity: {orderTrack.quantity}
          </div>

          <img className="product-image" src={orderTrack.product.image} />

          <div className="progress-labels-container">
            <div className={`progress-label ${isPreparing && 'current-status'}`}>
              Preparing
            </div>
            <div className={`progress-label ${isShipped && 'current-status'}`}>
              Shipped
            </div>
            <div className={`progress-label ${isDelivered && 'current-status'}`}>
              Delivered
            </div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${deliveryPercent}%` }}></div>
          </div>
        </div>
      </div>
    </>
  )
}

