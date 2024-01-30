import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Payment from './Payment';
import { createReduxStore, ACTIONS } from './redux';

const mockData = [
  {
    id: '998',
    label: 'Pudding',
    category: 'pudding',
    image: 'https://i.imgur.com/test-1.jpg',
    price: 15,
  },
  {
    id: '999',
    label: 'Chocolate',
    category: 'cake',
    image: 'https://i.imgur.com/test-2.jpg',
    price: 60,
  },
];

describe('Test Payment', () => {
  const cartIds = ['998', '999'];

  function renderPayment(store = createReduxStore(), props = {}) {
    return render(
      <Provider store={store}>
        <Payment {...props} />
      </Provider>
    );
  }

  const addItemsInStore = (store) => {
    store.dispatch({
      type: ACTIONS.LOAD_SNACKS,
      payload: {
        menu: mockData,
      },
    });
    cartIds.forEach((id) => {
      store.dispatch({
        type: ACTIONS.ADD_TO_CART,
        payload: {
          itemId: id,
        },
      });
    });
  };

  const resetMenu = (store) => {
    cartIds.forEach((id) => {
      store.dispatch({
        type: ACTIONS.REMOVE_FROM_CART,
        payload: {
          snackReducer: id,
        },
      });
    });
  };

  test('submit order button should show cart total price when items present in cart', () => {
    const store = createReduxStore();
    addItemsInStore(store);
    renderPayment(store);

    expect(screen.getByRole('link', { name: /送出訂單/i })).toHaveTextContent(
      '送出訂單 ($75)'
    );

    // resetMenu(store);
    // expect(screen.queryByRole('link', { name: /送出訂單/i })).toBe(null);
  });
});
