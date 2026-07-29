import { it, expect, describe, vi, beforeEach} from "vitest";
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import axios from 'axios';
import { Product } from "./Product";

vi.mock('axios');// create a mock for axios package

describe('Product Component', () => {

  let product;

  let loadCart;//vi.fn() ==>> buat mocking, ini cuma function kosong, ga ngelakuin apa-apa

  let addToCart;

  beforeEach(() => {
    product = {
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87
      },
      priceCents: 1090,
      keywords: ["socks", "sports", "apparel"]
    };

    loadCart = vi.fn();

    addToCart = async (productId, quantity) => {
      await axios.post('/api/cart-items', {
        productId: productId,
        quantity: quantity || 1
      });
      await loadCart()
    }
  })

  it('display product detail correctly', () => {

    render(<Product product={product} addToCart={addToCart} />)
    //render buat munculin component nya
    //screen buat ngecek ada engganya

    expect(screen.getByTestId('product-image')).toHaveAttribute('src', 'images/products/athletic-cotton-socks-6-pairs.jpg')

    expect(screen.getByText('Black and Gray Athletic Cotton Socks - 6 Pairs')).toBeInTheDocument();
    //toBeInTheDocument provided by @testing-library/jest-dom
    expect(screen.getByTestId('product-rating-stars')).toHaveAttribute('src', `images/ratings/rating-45.png`)
    expect(screen.getByText('87')).toBeInTheDocument();

    expect(screen.getByText('$10.90')).toBeInTheDocument();

  });

  it('adds a product to the cart', async () => {



    render(<Product product={product} addToCart={addToCart} />)

    const user = userEvent.setup();
    const addToCartBtn = screen.getByTestId('add-to-cart-button');
    await user.click(addToCartBtn);

    expect(axios.post).toHaveBeenCalledWith('/api/cart-items', {
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1
    })

    expect(loadCart).toHaveBeenCalled();

  })
});