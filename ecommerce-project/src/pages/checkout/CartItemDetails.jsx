import axios from 'axios';
import { useRef, useState } from 'react';
import { formatMoney } from "../../utils/money";

export function CartItemDetails({ cartItem, loadCart }) {
  const [isUpdate, setIsUpdate] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);
  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await loadCart();
  }
  const updateCart = async () => {
    await axios.put(`/api/cart-items/${cartItem.productId}`, {
      quantity
    });
    await loadCart();
    setIsUpdate(false);
  }
  const inputRef = useRef(null);
  return (
    <>
      <img className="product-image"
        src={cartItem.product.image} />

      <div className="cart-item-details">
        <div className="product-name">
          {cartItem.product.name}

        </div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity:
            {isUpdate &&
              <input
                type='text'
                ref={inputRef}
                className='update-quantity-input'
                value={quantity}
                onChange={(event) => {
                  if (Number.isNaN(Number(event.target.value))) {
                    return;
                  }
                  setQuantity(Number(event.target.value))
                }}
                onKeyDown={event => {
                  if (event.key === 'Enter') {
                    updateCart();
                  }
                  if (event.key === 'Escape') {
                    setQuantity(cartItem.quantity);
                    setIsUpdate(false);
                  }
                }}

              />}
            <span
              className="quantity-label">{
                cartItem.quantity
              }</span>
          </span>
          <span className="update-quantity-link link-primary" onClick={() => {
            !isUpdate ? setIsUpdate(true) : updateCart();
          }}>
            {isUpdate ? 'save' : 'Update'}
          </span>
          <span className="delete-quantity-link link-primary" onClick={deleteCartItem}>
            Delete
          </span>
        </div>
      </div>
    </>
  )
}