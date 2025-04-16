import { createFeatureSelector, createSelector } from '@ngrx/store';
import { productFeatureKey, ProductState } from './product.reducer';

export const selectProductState =
  createFeatureSelector<ProductState>(productFeatureKey);

export const selectProducts = createSelector(
  selectProductState,
  (state) => state.products
);

export const selectDetails = createSelector(
  selectProductState,
  (state) => state.details
);

export const selectPageNumber = createSelector(
  selectProductState,
  (state) => state.pageNumber
);

export const selectTotalPages = createSelector(
  selectProductState,
  (state) => state.totalPages
);

export const selectTotalCount = createSelector(
  selectProductState,
  (state) => state.totalCount
);

export const selectError = createSelector(
  selectProductState,
  (state) => state.error
);
