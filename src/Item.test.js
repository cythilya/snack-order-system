import React from 'react';
import { Provider } from 'react-redux';
import {
  render,
  fireEvent,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';
import { createReduxStore, ACTIONS } from './redux';
import * as utils from './utils';

jest.mock('./utils');

const mockData = [
  {
    id: '999',
    label: 'Chocolate cake',
    category: 'cake',
    image: 'https://i.imgur.com/test-2.jpg',
    price: 60,
  },
];

describe('Item component', () => {
  const store = createReduxStore();
  const renderApp = (store) =>
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

  beforeEach(() => {
    utils.loadSnackData.mockImplementation(() => Promise.resolve(mockData));
  });

  afterEach(() => {
    utils.loadSnackData.mockRestore();
    jest.restoreAllMocks();
  });

  test('should show 2 item when click increment button', async () => {
    const spyDispatch = jest.spyOn(store, 'dispatch');
    renderApp(store);
    await waitForElementToBeRemoved(() => screen.getByText(/Loading/i));

    // add Chocolate cake to cart
    fireEvent.click(screen.getByTestId('add-to-cart'));
    fireEvent.click(screen.getByTestId('increment-button'));

    // check the quantity of Chocolate cake is shown & updated to 2
    expect(screen.getByTestId('item-quantity')).toHaveTextContent('2');
    // toBe vs toHaveTextContent
    // error: <div data-testid="item-quantity">2</div>
    // expect(screen.getByTestId('item-quantity')).toBe('2');

    // dispatch action to add item to cart
    expect(spyDispatch).toHaveBeenCalledWith({
      type: ACTIONS.ADD_TO_CART,
      payload: { itemId: '999' },
    });
  });
});
