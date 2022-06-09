import { AnyAction } from "redux";
import { setCartItems, setIsHidden, setIsClientSecret } from "./cart-actions";
import { CartItem } from "./cart-types";

export type CartState = {
  readonly isHidden: boolean,
  readonly cartItems: CartItem[],
  readonly clientSecret: any | null
};

export const CART_INITIAL_STATE: CartState  = {
  isHidden: false,
  cartItems: [],
  clientSecret: null
}

export const cartReducer = (state = CART_INITIAL_STATE, action: AnyAction): CartState => {
  if (setIsHidden.match(action)) {
    return {
      ...state,
      isHidden: action.payload
    }
  }

  if (setCartItems.match(action)) {
    return {
      ...state,
      cartItems: action.payload
    };
  }

  if (setIsClientSecret.match(action)) {
    return {
      ...state,
      clientSecret: action.payload
    };
  }

  return state;
}
