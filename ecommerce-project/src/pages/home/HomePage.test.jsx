import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import axios from 'axios';
import { MemoryRouter } from "react-router";
import { HomePage } from "./HomePage";


vi.mock('axios');// mocking axios

describe('HomePage Component', () => {
  let loadCart;
  let addToCart;
  let user;
  let productContainers;
  let addToCartBtn1;
  let addToCartBtn2;

  beforeEach(async () => {
    axios.get.mockImplementation(async (urlPath) => { // karena axios.get berupa promise, kita tambahkan async agar yang ini juga jadi promise 
      if (urlPath === '/api/products') {
        return {
          //usahakan memiliki behave yang sama dengan yang asli, karena "data" yang didapat berupa array, "data" di sini juga berupa array
          data: [{
            id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            image: "images/products/athletic-cotton-socks-6-pairs.jpg",
            name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
            rating: {
              stars: 4.5,
              count: 87
            },
            priceCents: 1090,
            keywords: ["socks", "sports", "apparel"]
          },
          {
            id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            image: "images/products/intermediate-composite-basketball.jpg",
            name: "Intermediate Size Basketball",
            rating: {
              stars: 4,
              count: 127
            },
            priceCents: 2095,
            keywords: ["sports", "basketballs"]
          }]
        };
      }
    })

    loadCart = vi.fn(); // mock function, actually doing nothing

    addToCart = async (productId, quantity) => {
      await axios.post('/api/cart-items', {
        productId: productId,
        quantity: quantity || 1
      });
      await loadCart()
    }
    user = userEvent.setup();


    //di dalam Header component kita punya <Link></Link>, dan component ini harus berada didalam <BrowserRouter></BrowserRouter>, untuk testing kita bisa pakai <MemoryRouter/> 
    render(
      <MemoryRouter>
        <HomePage cart={[]} addToCart={addToCart} />
      </MemoryRouter>
    )

    productContainers = await screen.findAllByTestId('product-container');

    addToCartBtn1 = within(productContainers[0]).getByTestId('add-to-cart-button');

    addToCartBtn2 = within(productContainers[1]).getByTestId('add-to-cart-button');
  })

  it('display the product correctly', async () => {
    const productContainers = await screen.findAllByTestId('product-container');  // gunakan find untuk menunggu sampai product ada isinya (tidak kosong, karena product di request dan membutuhkan waktu)

    expect(productContainers.length).toBe(2);

    //nama terdisplay dengan benar; wtihi
    expect(within(productContainers[0]).getByText('Black and Gray Athletic Cotton Socks - 6 Pairs')).toBeInTheDocument();
    expect(within(productContainers[1]).getByText('Intermediate Size Basketball')).toBeInTheDocument();
  })

  it('works with add to cart button', async () => {
    await user.click(addToCartBtn1);
    await user.click(addToCartBtn2);

    expect(axios.post).toHaveBeenNthCalledWith(1, '/api/cart-items', {
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1
    });
    expect(axios.post).toHaveBeenNthCalledWith(2, '/api/cart-items', {
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1
    })
    expect(loadCart).toHaveBeenCalledTimes(2);
  });

  it('can select quantity', async () => {

    const quantitySelector1 = within(productContainers[0]).getByTestId('quantity-selector');
    const quantitySelector2 = within(productContainers[1]).getByTestId('quantity-selector');

    await user.selectOptions(quantitySelector1, '2');
    await user.selectOptions(quantitySelector2, '3');
    await user.click(addToCartBtn1);
    await user.click(addToCartBtn2);

    // 3 berarti user.click yang ketiga, panggilan ketiga
    expect(axios.post).toHaveBeenNthCalledWith(3, '/api/cart-items', {
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2
    });

    //ini yang ke-4
    expect(axios.post).toHaveBeenNthCalledWith(4, '/api/cart-items', {
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 3
    })
    expect(loadCart).toHaveBeenCalledTimes(2);
  });


})