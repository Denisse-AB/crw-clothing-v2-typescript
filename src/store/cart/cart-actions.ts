import { createAction, withMatcher, ActionWithPayload } from '../../utils/reducer/reducer-utils';
import { CategoryItem } from '../categories/category-types';
import { CART_ACTION_TYPES, CartItem } from './cart-types';

// Helper functions
const addCartItem = (cartItems: CartItem[], productToAdd: CategoryItem): CartItem[] => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems: CartItem[], cartItemToRemove: CartItem): CartItem[] => {
  // find the cart item to remove
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  // check if quantity is equal to 1, if it is remove that item from the cart
  if (existingCartItem && existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  // return back cartitems with matching cart item with reduced quantity
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems: CartItem[], cartItemToClear: CartItem): CartItem[] =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

// Action Types
export type setIsCartHidden = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_HIDDEN, boolean>

export type setCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>

export type setIsClientSecret = ActionWithPayload<CART_ACTION_TYPES.SET_CLIENT_SECRET, any | null>

// Action Creators
export const setIsHidden = withMatcher((boolean: boolean):
  setIsCartHidden =>
    createAction(CART_ACTION_TYPES.SET_IS_CART_HIDDEN, boolean));

export const setIsClientSecret = withMatcher((any: any):
  setIsClientSecret =>
    createAction(CART_ACTION_TYPES.SET_CLIENT_SECRET, any));

export const setCartItems = withMatcher((cartItems: CartItem[]):
  setCartItems =>
    createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems))

// Actions
export const addItemToCart = (cartItems: CartItem[], productToAdd: CategoryItem) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return setCartItems(newCartItems);
};

export const removeItemFromCart = (cartItems: CartItem[], cartItemToRemove: CartItem) => {
  const newCartItems = removeCartItem(cartItems, cartItemToRemove);
  return setCartItems(newCartItems);
};

export const clearItemFromCart = (cartItems: CartItem[], cartItemToClear: CartItem) => {
  const newCartItems = clearCartItem(cartItems, cartItemToClear);
  return setCartItems(newCartItems);
};

export const stripeSecretAction = (token: string | null) => {
  return setIsClientSecret(token);
};
