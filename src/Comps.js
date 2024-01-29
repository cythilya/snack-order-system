import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ACTIONS } from './redux';

export function Item(props) {
  const { item } = props;

  const cartByIds = useSelector((state) => state.cartByIds);
  const dispatch = useDispatch();

  const quantity = cartByIds[item.id]?.quantity ?? 0;

  function handleIncrement() {
    dispatch({
      type: ACTIONS.ADD_TO_CART,
      payload: {
        itemId: item.id,
      },
    });
  }

  function handleDecrement() {
    dispatch({
      type: ACTIONS.REMOVE_FROM_CART,
      payload: {
        itemId: item.id,
      },
    });
  }

  const addBtn = (
    <button
      aria-label={`Add ${item.label} to cart`}
      className="menu-btn-add"
      onClick={handleIncrement}
    >
      <IconPlus />
    </button>
  );

  const increaseBtn = (
    <button
      aria-label={`Add ${item.label} to cart`}
      className="menu-btn-item"
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
    <div className="menu-item-qty" role="status" aria-live="polite">
      {quantity}
    </div>
  );

  return (
    <li className="menu-item">
      <div className="menu-header" >
        <div className="menu-item-title">
          <div>{item.label}</div>
          <span>(${item.price})</span>
        </div>
        <img src={process.env.PUBLIC_URL + `/images/${item.image}`} width="60" height="60" />
      </div>
      {quantity === 0 ? (
        addBtn
      ) : (
        <div className="menu-btn-group">
          {decreaseBtn}
          {qtyIndicator}
          {increaseBtn}
        </div>
      )}
    </li>
  );
}

function PureSnackList(props) {
  console.log('SnackList Re-Render');
  const { list } = props;
  return (
    <ul className="menu-list">
      {list.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </ul>
  );
}

export const SnackList = React.memo(PureSnackList);

export function Message(props) {
  const { status } = props;

  const messages = {
    loading: 'Loading...',
    error: (
      <>
        Menu failed to load.
        <br />
        Please try again...
      </>
    ),
  };

  const messageText = messages[status];

  if (!messageText) {
    return null;
  }

  return (
    <div
      className={`message-${status}`}
      role={status === 'error' ? 'alert' : 'status'}
      aria-live="polite"
      aria-busy={status === 'loading'}
    >
      {messageText}
    </div>
  );
}

function selectorCartPrice(state) {
  const { cartByIds, menuById } = state;
  let cartPrice = 0;

  const cartKeys = Object.keys(cartByIds);
  cartKeys.forEach((id) => {
    const item = menuById[id];
    const cartItem = cartByIds[id];

    const price = cartItem.quantity * item.price;
    cartPrice += price;
  });

  return cartPrice;
}


export function Payment() {
  const dispatch = useDispatch();
  const cartPrice = useSelector(selectorCartPrice);

  function submitOrder() {
    dispatch({
      type: ACTIONS.SUBMIT_ORDER,
      payload: {orderStatus: 'done'}
    });
  }
  return (
    <footer>
      {cartPrice > 0 && (
        <a href="#payment" className="snack-app-pay-btn" aria-live="polite"
        onClick={submitOrder}

        >
          送出訂單 (${cartPrice})
        </a>
      )}
    </footer>
  );
}



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