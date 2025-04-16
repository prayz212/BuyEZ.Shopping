import { createFeatureSelector, createSelector } from '@ngrx/store';
import { cartFeatureKey, CartState } from './cart.reducer';

export const selectCartState = createFeatureSelector<CartState>(cartFeatureKey);

export const selectCartItems = createSelector(
  selectCartState,
  (state) => state.items
);
