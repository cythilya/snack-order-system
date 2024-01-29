import { createStore } from 'redux';

export const ACTIONS = {
  CHANGE_SNACKS: 'CHANGE_SNACKS',
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
  cartByIds: {},
  orderStatus: 'idle',
};

function foodReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.CHANGE_SNACKS: {
      const { category } = state;
      const newCategory = category === 'all' ? 'ice' : 'all';

      return {
        ...state,
        category: newCategory,
        cartByIds: {},
      };
    }
    case ACTIONS.LOAD_SNACKS: {
      const { menu } = action.payload;

      const menuById = {};
      menu.forEach((item) => {
        menuById[item.id] = item;
      });
      const allMenuId = menu.map((item) => item.id);
      const categoryMenuId = menu.filter((item) => item.category === 'ice').map((item) => item.id);

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
      const { cartByIds } = state;

      const cartItem = cartByIds[itemId] || {
        quantity: 0,
      };

      cartItem.quantity += 1;

      const newCart = {
        ...cartByIds,
        [itemId]: cartItem,
      };

      return {
        ...state,
        cartByIds: newCart,
      };
    }
    case ACTIONS.REMOVE_FROM_CART: {
      const { itemId } = action.payload;
      const { cartByIds } = state;

      const cartItem = cartByIds[itemId];

      if (!cartItem) {
        return state;
      }

      cartItem.quantity -= 1;

      const newCart = {
        ...cartByIds,
        [itemId]: cartItem,
      };

      return {
        ...state,
        cartByIds: newCart,
      };
    }
    case 'SUBMIT_ORDER': {
      const { orderStatus } = action.payload;
      const newOrderStatus = orderStatus;
      console.log('newOrderStatus', newOrderStatus)

      return {
        ...state,
        orderStatus: newOrderStatus,
      };
    }
    default:
      return state;
  }
}

const enableReduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__?.();

export function createReduxStore() {
  const store = createStore(foodReducer, enableReduxDevTools);
  return store;
}
