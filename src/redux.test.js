import { snackReducer, ACTIONS } from './redux';

describe('snackReducer', () => {
  test('should add 1 item to cart when dispatch action ADD_TO_CART from empty', () => {
    const initialState = { cart: {} };
    const action = {
      type: ACTIONS.ADD_TO_CART,
      payload: {
        itemId: 'item_id_998',
      },
    };

    expect(snackReducer(initialState, action)).toEqual({
      cart: {
        item_id_998: {
          quantity: 1,
        },
      },
    });
  });

  test('should get 2 item to cart when dispatch action ADD_TO_CART from 1 item', () => {
    const initialState = {
      cart: {
        item_id_998: {
          quantity: 1,
        },
      },
    };
    const action = {
      type: ACTIONS.ADD_TO_CART,
      payload: {
        itemId: 'item_id_998',
      },
    };

    expect(snackReducer(initialState, action)).toEqual({
      cart: {
        item_id_998: {
          quantity: 2,
        },
      },
    });
  });
});
