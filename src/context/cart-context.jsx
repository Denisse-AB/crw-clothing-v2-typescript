/*
Use Reducers when you have to update multiple objets
of the same kind. ex. cartItems, cartTotal, isHidden
*/

import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer-utils";

// Helpers
const addCartItem = (cartItems, productToAdd) => {
  // find product
  const existingCartItem = cartItems.find((cartItem) =>
    cartItem.id === productToAdd.id
  )
  // If product, increae qty
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
      ? {...cartItem, quantity: cartItem.quantity + 1}
      : cartItem
    )
  }
  // return new array of cart items
  return [...cartItems, {...productToAdd, quantity: 1}]
}

const removeCartItem = (cartItems, productToRemove) => {
  // Find
  const existingCartItem = cartItems.find(cartItem =>
    cartItem.id === productToRemove.id
  )
  // Check if exists
  if (existingCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== productToRemove.id)
  }
  // Return new array
  return cartItems.map(
    cartItem => cartItem.id === productToRemove.id
    ? {...cartItem, quantity: cartItem.quantity - 1}
    : cartItem)
}

const clearCartItem = (cartItems, productToClear) => {
  return cartItems.filter(cartItem => cartItem.id !== productToClear.id)
}

export const CartContext = createContext({
  isHidden: false,
  setHidden: () => {},
  cartItems: [],
  addItemToCart: () => {},
  itemsCount: 0,
  removeItem: () => {},
  clearItemFromCart: () => {},
  cartTotal: 0
});

const INITIAL_STATE = {
  isHidden: false,
  cartItems: [],
  itemsCount: 0,
  cartTotal: 0
}

// Reducer
export const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_IS_CART_HIDDEN: 'SET_IS_CART_HIDDEN'
}

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload
      };
    case CART_ACTION_TYPES.SET_IS_CART_HIDDEN:
      return {
        ...state,
        isHidden: payload
      }
    default:
      throw new Error(`Unhadle type ${type} in cart reducer`)
  }
}


export const CartProvider = ({ children }) => {
  const [{
    cartItems,
    isHidden,
    itemsCount,
    cartTotal},
    dispatch
  ] = useReducer(cartReducer, INITIAL_STATE);

  const updateCartItemsReducer= (newCartItems) => {
    const newCartCount = newCartItems.reduce((total, cartItem) =>
      total + cartItem.quantity, 0);

    const newCartTotal = newCartItems.reduce((total, cartItem) =>
      total + cartItem.quantity * cartItem.price, 0);

    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartTotal: newCartTotal,
        itemsCount: newCartCount
      })
    )
  }

  const addItemToCart = (productToAdd) => {
    // console.log(productToAdd)
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  }

  const decreaseQty = (productToRemove) => {
    const newCartItems = removeCartItem(cartItems, productToRemove);
    updateCartItemsReducer(newCartItems);
  }

  const clearItemFromCart = (productToClear) => {
    const newCartItems = clearCartItem(cartItems, productToClear);
    updateCartItemsReducer(newCartItems);
  }

  const setHidden = (bool) => {
    dispatch(
      createAction(CART_ACTION_TYPES.SET_IS_CART_HIDDEN, bool )
    )
  }

  const value = {
    isHidden,
    setHidden,
    cartItems,
    addItemToCart,
    itemsCount,
    decreaseQty,
    clearItemFromCart,
    cartTotal
  };
  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  )
}
