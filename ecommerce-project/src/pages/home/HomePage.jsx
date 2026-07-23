import './HomePage.css'
//header images

//Home or products images
// import sock from '../assets/images/products/athletic-cotton-socks-6-pairs.jpg'
//anyway, if we put file on public folder, we can acces this file or folder from everywhere. misalnya images/ratings/blablabla, vite bakalan ngeliat folder "images" yang ada di public 
//here, we use it for favicon(icon di tab), and others

import axios from 'axios'
import { Header } from '../../components/Header'
// import { products } from '../../starting-code/data/products'
import { useEffect, useState } from 'react'
import { ProductsGrid } from './ProductsGrid';


export function HomePage({ cart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/products')
      .then((response) => {
        setProducts(response.data)
      })
  }, [])

  return (
    <>
      <link rel="icon" href="home-favicon.png" />
      <title>Home Page</title>

      <Header cart={cart} />

      <div className="home-page">
        <ProductsGrid products={products} />
      </div>
    </>
  )
}

/*
axios dipakai sebagai pengganti fetch()
=> axios.get('url').then((response)=>{
  response.data
})
  data sudah disimpan didalam response, sehingga bisa langsung dipanggil
  
  untuk mencegah axios dipanggil berkali-kali, kita gunakan useEffect,jadi axios hanya akan menjalankan request sekali setelah component dibuat.

  untuk menyimpan response.data agar bisa dipakai diluar, kita menggunakan useState()
*/