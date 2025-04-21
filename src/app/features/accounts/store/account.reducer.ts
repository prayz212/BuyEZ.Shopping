import { createReducer, on } from '@ngrx/store';
import { Token, UserInfo } from '../models/token.model';
import { AccountActions } from './account.actions';

export const accountFeatureKey = 'account';

export interface AccountState {
  token: Token | null;
  userinfo: UserInfo | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: any;
}

export const initialState: AccountState = {
  token: null,
  userinfo: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const accountReducer = createReducer(
  initialState,

  /*  Authenticate reducers  */
  on(AccountActions.login, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AccountActions.loginSuccess, (state, { token }) => ({
    ...state,
    token,
    isAuthenticated: true,
    loading: false,
  })),
  on(AccountActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(AccountActions.queryUserInfo, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AccountActions.queryUserInfoSuccess, (state, { queryResponse }) => ({
    ...state,
    userinfo: queryResponse,
    loading: false,
  })),
  on(AccountActions.queryUserInfoFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  /*  Unauthenticated reducers  */
  on(AccountActions.logout, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AccountActions.logoutSuccess, (state) => ({
    ...state,
    token: null,
    isAuthenticated: false,
    userinfo: null,
    loading: false,
    error: null,
  })),
  on(AccountActions.logoutFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  /*  Refresh token reducers  */
  on(AccountActions.refreshToken, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AccountActions.refreshTokenSuccess, (state, { token }) => ({
    ...state,
    token,
    isAuthenticated: true,
    loading: false,
  })),
  on(AccountActions.refreshTokenFailure, (state, { error }) => ({
    ...state,
    token: null,
    isAuthenticated: false,
    loading: false,
    error,
  }))
);
