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
import { createReduxStore } from './redux';
import * as utils from './utils';

jest.mock('./utils');

const mockData = [
  {
    id: 'Pudding',
    label: 'Pudding',
    price: 15,
  },
  {
    id: 'Chocolate',
    label: 'Chocolate',
    category: 'category',
    price: 60,
  },
];

describe('Test App', () => {
  function renderApp(store = createReduxStore(), props = {}) {
    return render(
      <Provider store={store}>
        <App {...props} />
      </Provider>
    );
  }

  beforeEach(() => {
    utils.loadSnackData.mockImplementation(() => Promise.resolve(mockData));
  });

  afterEach(() => {
    utils.loadSnackData.mockRestore();
  });

  test('show loading indicator till API responds', async () => {
    renderApp();

    // during loading, show app name and loading indicator
    expect(screen.getByRole('heading')).toHaveTextContent('Select Snacks!');
    expect(screen.getByRole('status')).toHaveTextContent('Loading...');

    await waitForElementToBeRemoved(() => screen.getByText(/Loading/i));
  });

  test('display menu & show price when items are added', async () => {
    renderApp();
    await waitForElementToBeRemoved(() => screen.getByText(/Loading/i));

    // on success, show menu
    expect(screen.getByText(/Pudding/i)).toBeInTheDocument();
    expect(screen.getByText(/Chocolate/i)).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /Pay for snacks/i })).toBe(null);

    // add Pudding to cart once
    fireEvent.click(
      screen.getByRole('button', { name: /Add Pudding to cart/i })
    );

    // check that the quantity of Sausage & cart price is shown.
    expect(screen.getByRole('status')).toHaveTextContent(1);
    expect(
      screen.getByRole('link', { name: /Pay for snacks/i })
    ).toHaveTextContent('Pay for snacks ($15)');

    // add more items to cart
    fireEvent.click(
      screen.getByRole('button', { name: /Add Chocolate to cart/i })
    );
    fireEvent.click(
      screen.getByRole('button', { name: /Add Chocolate to cart/i })
    );

    // check the quantity of Chocolate is shown & cart price is updated
    expect(screen.getAllByRole('status')[1]).toHaveTextContent(2);
    expect(
      screen.getByRole('link', { name: /Pay for snacks/i })
    ).toHaveTextContent('Pay for snacks ($135)');

    // remove Chocolate from cart
    fireEvent.click(
      screen.getByRole('button', { name: /Remove Chocolate from cart/i })
    );

    // on removing an item, show the updated quantities & price.
    expect(screen.getAllByRole('status')[0]).toHaveTextContent(1);
    expect(screen.getAllByRole('status')[1]).toHaveTextContent(1);
    expect(
      screen.getByRole('link', { name: /Pay for snacks/i })
    ).toHaveTextContent('Pay for snacks ($75)');
  });

  test('only show ice when category filter is applied', async () => {
    renderApp();
    await waitForElementToBeRemoved(() => screen.getByText(/Loading/i));

    // enable 冰品 Only filter
    fireEvent.click(screen.getByRole('checkbox', { name: /冰品 Only/i }));

    expect(screen.queryByText(/Pudding/i)).toBe(null);
    // expect(screen.getByText(/Chocolate/i)).toBeInTheDocument();

    // disable 冰品 Only filter
    fireEvent.click(screen.getByRole('checkbox', { name: /冰品 Only/i }));

    expect(screen.getByText(/Pudding/i)).toBeInTheDocument();
    expect(screen.getByText(/Chocolate/i)).toBeInTheDocument();
  });

  it('shows error if API fails', async () => {
    utils.loadSnackData.mockImplementation(() => Promise.reject());
    renderApp();
    await waitForElementToBeRemoved(() => screen.getByText(/Loading/i));

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Menu failed to load.Please try again...'
    );
  });
});
