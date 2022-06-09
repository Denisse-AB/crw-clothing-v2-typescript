import { CategoryItem } from "../categories/category-types";

export enum CART_ACTION_TYPES {
  SET_CART_ITEMS = 'SET_CART_ITEMS',
  SET_IS_CART_HIDDEN = 'SET_IS_CART_HIDDEN',
  SET_CART_COUNT = 'SET_CART_COUNT',
  SET_CART_TOTAL = 'SET_CART_TOTAL',
  SET_CLIENT_SECRET = 'SET_CLIENT_SECRET'
};

export type CartItem = {
  quantity: number
} & CategoryItem;
