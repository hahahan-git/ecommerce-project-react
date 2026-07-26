import './OrderPage.css'
import { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import { Header } from '../../components/Header'
import { Link } from 'react-router';
import { OrdersGrid } from './OrdersGrid';

export function OrderPage({ cart }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrdersData = async () => {
      const response = await axios.get('/api/orders?expand=products')
      setOrders(response.data)
    }

    getOrdersData();
  }, [])
  return (
    <>

      <link rel="icon" href="orders-favicon.png" />
      <title>Orders</title>

      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <OrdersGrid orders={orders} />
      </div>
    </>
  )
}