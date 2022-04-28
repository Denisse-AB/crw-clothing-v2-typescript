import { takeLatest, all, call, put } from 'redux-saga/effects';

import { getCollectionAndDocuments } from '../../utils/firebase/firebase';

import { fetchCategoriesSuccess, fetchCategoriesFailure } from './category-actions';

import { CATEGORIES_ACTION_TYPES } from './category-types';

export function* fetchCategoriesStartAsync() {
  try {
    const categoriesArray = yield call(getCollectionAndDocuments, 'categories');
    yield put(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    yield put(fetchCategoriesFailure(error));
  }
};

export function* onFetchCategories() {
  yield takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesStartAsync
  );
}

export function* categoriesSaga() {
  yield all([call(onFetchCategories)]);
};