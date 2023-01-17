import {
  CART_ITEM_COUNT,
  DELETE_CART_ITEM,
  HIDE_LOADING,
  SHOW_LOADING,
  UPDATE_CART_ITEM,
} from "./pos.action";

const inititalState = {
  loading: false,
  cartItems: [],
};

const posReducer = (state = inititalState, action) => {
  switch (action.type) {
    case SHOW_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case HIDE_LOADING: {
      return {
        ...state,
        loading: false,
      };
    }
    case CART_ITEM_COUNT: {
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    }
    case UPDATE_CART_ITEM: {
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item._id === action.payload._id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    }
    case DELETE_CART_ITEM: {
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item._id !== action.payload._id
        ),
      };
    }
    default:
      return state;
  }
};

export default posReducer;
