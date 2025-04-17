import { createFeatureSelector, createSelector } from '@ngrx/store';
import { orderFeatureKey, OrderState } from './order.reducer';

export const selectOrderState =
  createFeatureSelector<OrderState>(orderFeatureKey);

export const selectOrders = createSelector(
  selectOrderState,
  (state) => state.orders
);

export const selectOrderDetail = createSelector(
  selectOrderState,
  (state) => state.details
);

export const selectTotalCount = createSelector(
  selectOrderState,
  (state) => state.totalCount
);

export const selectError = createSelector(
  selectOrderState,
  (state) => state.error
);
