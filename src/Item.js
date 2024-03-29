import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ACTIONS } from './redux';

const Item = ({ item }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const quantity = cart[item.id]?.quantity ?? 0;

  const handleIncrement = () => {
    dispatch({
      type: ACTIONS.ADD_TO_CART,
      payload: { itemId: item.id },
    });
  };

  const handleDecrement = () => {
    dispatch({
      type: ACTIONS.REMOVE_FROM_CART,
      payload: { itemId: item.id },
    });
  };

  const addBtn = (
    <button
      aria-label={`Add ${item.label} to cart`}
      className="menu-btn-add"
      data-testid="add-to-cart"
      onClick={handleIncrement}
    >
      <IconPlus />
    </button>
  );

  const incrementButton = (
    <button
      aria-label={`Add ${item.label} to cart`}
      className="menu-btn-item"
      data-testid="increment-button"
      onClick={handleIncrement}
    >
      <IconPlus />
    </button>
  );

  const decreaseBtn = (
    <button
      aria-label={`Remove ${item.label} from cart`}
      className="menu-btn-item"
      onClick={handleDecrement}
    >
      <IconMinus />
    </button>
  );

  const qtyIndicator = (
    <div
      data-testid="item-quantity"
      className="menu-item-qty"
      role="status"
      aria-live="polite"
    >
      {quantity}
    </div>
  );

  return (
    <li className="menu-item">
      <div className="menu-header">
        <div className="menu-item-title">
          <div>{item.label}</div>
          <span className="menu-item-price">(${item.price})</span>
        </div>
        <img
          alt={item.label}
          height="60"
          src={process.env.PUBLIC_URL + `/images/${item.image}`}
          width="60"
        />
      </div>
      {quantity === 0 ? (
        addBtn
      ) : (
        <div className="menu-btn-group">
          {decreaseBtn}
          {qtyIndicator}
          {incrementButton}
        </div>
      )}
    </li>
  );
};

export default Item;

// source- https://feathericons.com/
export function IconPlus() {
  return (
    <svg
      className="icon-plus"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );
}

// source- https://feathericons.com/
export function IconMinus() {
  return (
    <svg
      className="icon-minus"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );
}
