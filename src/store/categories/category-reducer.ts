import { CATEGORIES_ACTION_TYPES, Category } from "./category-types";

import { CategoryAction } from "./category-actions";

export type CategoriesState = {
  readonly categories: Category[],
  readonly isLoading: boolean,
  readonly error: Error | null
};

export const CATEGORIES_INITIAL_STATE: CategoriesState = {
  categories: [],
  isLoading: false, // for thunk
  error: null // for thunk
};

export const categoriesReducer = (
  state = CATEGORIES_INITIAL_STATE,
  action = {} as CategoryAction
): CategoriesState => {
  switch (action.type) {
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
      return { ...state, isLoading: true }
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
      return { ...state, isLoading: false, categories: action.payload }
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
      return { ...state, isLoading: false, error: action.payload }
    default:
      return state
  }
};