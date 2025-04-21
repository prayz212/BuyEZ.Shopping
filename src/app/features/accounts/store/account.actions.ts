import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import {
  SignInRequest,
  SignUpRequest,
} from '../models/api.model';
import { Token, UserInfo } from '../models/token.model';

/*  Authenticate actions  */
const login = createAction(
  '[Account] Login',
  props<{ credentials: SignInRequest }>()
);
const loginSuccess = createAction(
  '[Account] Login Success',
  props<{ token: Token }>()
);
const loginFailure = createAction(
  '[Account] Login Failure',
  props<{ error: HttpErrorResponse }>()
);

const queryUserInfo = createAction('[Account] Query User Info');
const queryUserInfoSuccess = createAction(
  '[Account] Query User Info Success',
  props<{ queryResponse: UserInfo }>()
);
const queryUserInfoFailure = createAction(
  '[Account] Query User Info Failure',
  props<{ error: HttpErrorResponse }>()
);

/*  Unauthenticated actions  */
const logout = createAction(
  '[Account] Logout',
  props<{ refreshToken: string }>()
);
const logoutSuccess = createAction('[Account] Logout Success');
const logoutFailure = createAction(
  '[Account] Logout Failure',
  props<{ error: HttpErrorResponse }>()
);

/*  Refresh token actions  */
const refreshToken = createAction(
  '[Account] Refresh Token',
  props<{ refreshToken: string }>()
);
const refreshTokenSuccess = createAction(
  '[Account] Refresh Token Success',
  props<{ token: Token }>()
);
const refreshTokenFailure = createAction(
  '[Account] Refresh Token Failure',
  props<{ error: HttpErrorResponse }>()
);

/*  Register actions  */
const register = createAction(
  '[Account] Register',
  props<{ newAccount: SignUpRequest }>()
);
const registerSuccess = createAction('[Account] Register Success');
const registerFailure = createAction(
  '[Account] Register Failure',
  props<{ error: HttpErrorResponse }>()
);

export const AccountActions = {
  login,
  loginSuccess,
  loginFailure,

  queryUserInfo,
  queryUserInfoSuccess,
  queryUserInfoFailure,

  logout,
  logoutSuccess,
  logoutFailure,

  refreshToken,
  refreshTokenSuccess,
  refreshTokenFailure,

  register,
  registerSuccess,
  registerFailure,
};
