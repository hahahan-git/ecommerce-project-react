import './HomePage.css'
//header images

//Home or products images
// import sock from '../assets/images/products/athletic-cotton-socks-6-pairs.jpg'
//anyway, if we put file on public folder, we can acces this file or folder from everywhere. misalnya images/ratings/blablabla, vite bakalan ngeliat folder "images" yang ada di public 
//here, we use it for favicon(icon di tab), and others

import { Header } from '../components/Header'
// import { products } from '../../starting-code/data/products'
import axios from 'axios'
import { useEffect, useState } from 'react'


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
        <div className="products-grid">
          {products.map((product) => {
            return (
              <div key={product.id} className="product-container">
                <div className="product-image-container">
                  <img className="product-image"
                    src={product.image} />
                </div>

                <div className="product-name limit-text-to-2-lines">
                  {product.name}
                </div>

                <div className="product-rating-container">
                  <img className="product-rating-stars"
                    src={`images/ratings/rating-${product.rating.stars * 10}.png`} />
                  <div className="product-rating-count link-primary">
                    {product.rating.count}
                  </div>
                </div>

                <div className="product-price">
                  ${(product.priceCents / 100).toFixed(2)}
                </div>

                <div className="product-quantity-container">
                  <select>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                </div>

                <div className="product-spacer"></div>

                <div className="added-to-cart">
                  <img src="images/icons/checkmark.png" />
                  Added
                </div>

                <button className="add-to-cart-button button-primary">
                  Add to Cart
                </button>
              </div>
            )
          })}

          {/* <div className="product-container">
            <div className="product-image-container">
              <img className="product-image"
                src={sock} />
            </div>

            <div className="product-name limit-text-to-2-lines">
              Black and Gray Athletic Cotton Socks - 6 Pairs
            </div>

            <div className="product-rating-container">
              <img className="product-rating-stars"
                src="images/ratings/rating-45.png" />
              <div className="product-rating-count link-primary">
                87
              </div>
            </div>

            <div className="product-price">
              $10.90
            </div>

            <div className="product-quantity-container">
              <select>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>

            <div className="product-spacer"></div>

            <div className="added-to-cart">
              <img src="images/icons/checkmark.png" />
              Added
            </div>

            <button className="add-to-cart-button button-primary">
              Add to Cart
            </button>
          </div>
          <div className="product-container">
            <div className="product-image-container">
              <img className="product-image"
                src="images/products/intermediate-composite-basketball.jpg" />
            </div>

            <div className="product-name limit-text-to-2-lines">
              Intermediate Size Basketball
            </div>

            <div className="product-rating-container">
              <img className="product-rating-stars"
                src="images/ratings/rating-40.png" />
              <div className="product-rating-count link-primary">
                127
              </div>
            </div>

            <div className="product-price">
              $20.95
            </div>

            <div className="product-quantity-container">
              <select>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>

            <div className="product-spacer"></div>

            <div className="added-to-cart">
              <img src="images/icons/checkmark.png" />
              Added
            </div>

            <button className="add-to-cart-button button-primary">
              Add to Cart
            </button>
          </div>
          <div className="product-container">
            <div className="product-image-container">
              <img className="product-image"
                src="images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg" />
            </div>

            <div className="product-name limit-text-to-2-lines">
              Adults Plain Cotton T-Shirt - 2 Pack
            </div>

            <div className="product-rating-container">
              <img className="product-rating-stars"
                src="images/ratings/rating-45.png" />
              <div className="product-rating-count link-primary">
                56
              </div>
            </div>

            <div className="product-price">
              $7.99
            </div>

            <div className="product-quantity-container">
              <select>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>

            <div className="product-spacer"></div>

            <div className="added-to-cart">
              <img src="images/icons/checkmark.png" />
              Added
            </div>

            <button className="add-to-cart-button button-primary">
              Add to Cart
            </button>
          </div> */}
        </div>
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