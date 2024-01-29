import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Payment  from './Payment';
import { createReduxStore, ACTIONS } from './redux';

const mockData = [
  {
    id: 'Pudding',
    label: 'Pudding',
    price: 15,
  },
  {
    id: 'Chocolate',
    label: 'Chocolate',
    category: 'cake',
    price: 60,
  },
];

describe('Test Payment', () => {
  const cartIds = ['Pudding', 'Chocolate'];

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
          itemId: id,
        },
      });
    });
  };

  test('payment footer shows cart price when items present in cart', () => {
    const store = createReduxStore();
    addItemsInStore(store);
    renderPayment(store);

    expect(
      screen.getByRole('link', { name: /送出訂單/i })
    ).toHaveTextContent('送出訂單 ($75)');

    resetMenu(store);
    expect(screen.queryByRole('link', { name: /送出訂單/i })).toBe(null);
  });
});
