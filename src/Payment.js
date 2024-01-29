import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ACTIONS } from './redux';

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


  export default Payment;