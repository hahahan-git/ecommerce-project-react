import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import axios from 'axios';
import { MemoryRouter, useLocation } from "react-router";
import { PaymentSummary } from "./PaymentSummary";

vi.mock('axios');

describe('PaymentSummary Component', () => {
  let paymentSummary;
  let loadCart;
  beforeEach(() => {
    paymentSummary = {
      "totalItems": 3,
      "productCostCents": 4275,
      "shippingCostCents": 0,
      "totalCostBeforeTaxCents": 4275,
      "taxCents": 428,
      "totalCostCents": 4703
    };

    loadCart = vi.fn();

  })
  it('display correctly', () => {


    render(
      <MemoryRouter>
        <PaymentSummary
          paymentSummary={paymentSummary}
          loadCart={loadCart} />
      </MemoryRouter>
    )

    const itemsRow = screen.getByTestId('items-row');
    const shippingHandlingRow = screen.getByTestId('shiping-handling-row');
    const totalBeforeTax = screen.getByTestId('total-before-tax-row');
    const estimatedTaxRow = screen.getByTestId('estimated-tax-row');
    const orderTotalRow = screen.getByTestId('order-total-row');

    expect(itemsRow).toBeInTheDocument()
    expect(itemsRow).toHaveTextContent('$42.75')

    expect(shippingHandlingRow).toBeInTheDocument()
    expect(shippingHandlingRow).toHaveTextContent('$0.00')

    expect(totalBeforeTax).toBeInTheDocument()
    expect(totalBeforeTax).toHaveTextContent('$42.75')

    expect(estimatedTaxRow).toBeInTheDocument()
    expect(estimatedTaxRow).toHaveTextContent('$4.28')

    expect(orderTotalRow).toBeInTheDocument()
    expect(orderTotalRow).toHaveTextContent('$47.03')
  });

  it('works Place Order button clicked', async () => {
    function Location() {
      const Location = useLocation();
      return <div data-testid='url-path'>{Location.pathname}</div>
    }
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <PaymentSummary
          paymentSummary={paymentSummary}
          loadCart={loadCart} />
        <Location />
      </MemoryRouter>
    )
    const placeOrderBtn = screen.getByTestId('place-order-btn');

    await user.click(placeOrderBtn);
    expect(axios.post).toBeCalledWith('/api/orders');
    expect(loadCart).toBeCalled();

    expect(screen.getByTestId('url-path')).toHaveTextContent('/order')
  })


})

