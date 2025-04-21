import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AccountState, accountFeatureKey } from './account.reducer';

export const selectAccountState =
  createFeatureSelector<AccountState>(accountFeatureKey);

export const selectAccessToken = createSelector(
  selectAccountState,
  (state) => state.token?.accessToken
);

export const selectRefreshToken = createSelector(
  selectAccountState,
  (state) => state.token?.refreshToken
);

export const selectIsAuthenticated = createSelector(
  selectAccountState,
  (state) => state.isAuthenticated
);

export const selectUserInfo = createSelector(
  selectAccountState,
  (state) => state.userinfo
);

export const selectError = createSelector(
  selectAccountState,
  (state) => state.error
);
