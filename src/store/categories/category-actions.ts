import { CATEGORIES_ACTION_TYPES, Category } from './category-types';
import { createAction, Action, ActionWithPayload } from '../../utils/reducer/reducer-utils';

// no payload
export type fetchCategoriesStart = Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>;
// payload
export type fetchCategoriesSuccess = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, Category[]>;

export type fetchCategoriesFailure = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, Error>;

export type CategoryAction =
| fetchCategoriesStart
| fetchCategoriesSuccess
| fetchCategoriesFailure;

export const fetchCategoriesStart = (): fetchCategoriesStart =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess = (categoriesArray: Category[]): fetchCategoriesSuccess =>
  createAction(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
    categoriesArray
  );

export const fetchCategoriesFailure = (error: Error): fetchCategoriesFailure =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);
