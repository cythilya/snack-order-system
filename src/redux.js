import { createStore } from 'redux';

export const ACTIONS = {
  CHANGE_CATEGORY: 'CHANGE_CATEGORY',
  LOAD_SNACKS: 'LOAD_SNACKS',
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  SUBMIT_ORDER: 'SUBMIT_ORDER',
};

const initialState = {
  category: 'all',
  menuById: {},
  menuIdList: {
    all: [],
    ice: [],
  },
  cart: {},
  orderStatus: 'idle',
};

export const snackReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.CHANGE_CATEGORY: {
      const { category } = state;
      const newCategory = category === 'all' ? 'ice' : 'all';

      return {
        ...state,
        category: newCategory,
        cart: {},
      };
    }
    case ACTIONS.LOAD_SNACKS: {
      const { menu } = action.payload;

      const menuById = {};
      menu.forEach((item) => {
        menuById[item.id] = item;
      });
      const allMenuId = menu.map((item) => item.id);
      const categoryMenuId = menu
        .filter((item) => item.category === 'ice')
        .map((item) => item.id);

      return {
        ...state,
        menuById,
        menuIdList: {
          all: allMenuId,
          ice: categoryMenuId,
        },
      };
    }
    case ACTIONS.ADD_TO_CART: {
      const { itemId } = action.payload;
      const { cart } = state;

      const cartItem = cart[itemId] || { quantity: 0 };
      cartItem.quantity += 1;

      const newCart = {
        ...cart,
        [itemId]: cartItem,
      };

      return {
        ...state,
        cart: newCart,
      };
    }
    case ACTIONS.REMOVE_FROM_CART: {
      const { itemId } = action.payload;
      const { cart } = state;

      const cartItem = cart[itemId];

      if (!cartItem) {
        return state;
      }

      cartItem.quantity -= 1;

      const newCart = {
        ...cart,
        [itemId]: cartItem,
      };

      return {
        ...state,
        cart: newCart,
      };
    }
    case 'SUBMIT_ORDER': {
      const { orderStatus } = action.payload;
      const newOrderStatus = orderStatus;

      return {
        ...state,
        orderStatus: newOrderStatus,
      };
    }
    default:
      return state;
  }
};

const enableReduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__?.();

export function createReduxStore() {
  const store = createStore(snackReducer, enableReduxDevTools);
  return store;
}
