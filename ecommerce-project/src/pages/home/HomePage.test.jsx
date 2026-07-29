import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import axios from 'axios';
import { MemoryRouter } from "react-router";
import { HomePage } from "./HomePage";


vi.mock('axios');// mocking axios

describe('HomePage Component', () => {
  it('display the product correctly', async () => {
    const addToCart = vi.fn(); // mock function, actually doing nothing

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


    //di dalam Header component kita punya <Link></Link>, dan component ini harus berada didalam <BrowserRouter></BrowserRouter>, untuk testing kita bisa pakai <MemoryRouter/> 
    render(
      <MemoryRouter>
        <HomePage cart={[]} addToCart={addToCart} />
      </MemoryRouter>
    )

    const productContainers = await screen.findAllByTestId('product-container');  // gunakan find untuk menunggu sampai product ada isinya (tidak kosong, karena product di request dan membutuhkan waktu)

    expect(productContainers.length).toBe(2);

    //nama terdisplay dengan benar; wtihi
    expect(within(productContainers[0]).getByText('Black and Gray Athletic Cotton Socks - 6 Pairs')).toBeInTheDocument();

    expect(within(productContainers[1]).getByText('Intermediate Size Basketball')).toBeInTheDocument();


  })
})