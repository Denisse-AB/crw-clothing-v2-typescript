import { CATEGORIES_ACTION_TYPES, Category } from './category-types';
import { createAction, Action, ActionWithPayload, withMatcher } from '../../utils/reducer/reducer-utils';

// no payload
export type fetchCategoriesStart = Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>;
// payload
export type fetchCategoriesSuccess = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, Category[]>;

export type fetchCategoriesFailure = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, Error>;

// discriminated union type for debug purposes
// export type CategoryAction =
// | fetchCategoriesStart
// | fetchCategoriesSuccess
// | fetchCategoriesFailure;

export const fetchCategoriesStart = withMatcher((): fetchCategoriesStart =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START));

export const fetchCategoriesSuccess = withMatcher((categoriesArray: Category[]): fetchCategoriesSuccess =>
  createAction(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
    categoriesArray
  ));

export const fetchCategoriesFailure = withMatcher((error: Error): fetchCategoriesFailure =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error));
