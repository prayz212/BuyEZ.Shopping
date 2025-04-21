import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import moment from 'moment';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { AccountService } from '../../../core/services/account.service';
import { GlobalSettingsActions } from '../../../store/global.actions';
import { AccountActions } from './account.actions';

/*    Auth initial     */
export const initAuth = createEffect(
  (actions$ = inject(Actions), accountService = inject(AccountService)) => {
    return actions$.pipe(
      ofType('@ngrx/effects/init'),
      map(() => {
        const storedToken = accountService.loadTokensFromStorage();

        if (
          storedToken.accessToken &&
          storedToken.refreshToken &&
          storedToken.expiresAt &&
          !isNaN(storedToken.expiresAt.getTime())
        ) {
          return AccountActions.loginSuccess({ token: storedToken });
        }

        if (storedToken.refreshToken) {
          return AccountActions.refreshToken({
            refreshToken: storedToken.refreshToken,
          });
        }

        return { type: '[Effect] Initialized' };
      })
    );
  },
  {
    functional: true,
  }
);

/*    Login     */
export const login = createEffect(
  (actions$ = inject(Actions), accountService = inject(AccountService)) => {
    return actions$.pipe(
      ofType(AccountActions.login),
      exhaustMap(({ credentials }) =>
        accountService.login(credentials).pipe(
          map((response) =>
            AccountActions.loginSuccess({
              token: {
                accessToken: response.accessToken,
                refreshToken: response.refreshToken,
                expiresAt: moment().add(response.expiresIn).toDate(),
              },
            })
          ),
          catchError((error: HttpErrorResponse) =>
            of(AccountActions.loginFailure(error))
          )
        )
      )
    );
  },
  {
    functional: true,
  }
);

export const loginSuccess = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(AccountActions.loginSuccess),
      map(() => AccountActions.queryUserInfo())
    );
  },
  {
    functional: true,
  }
);

export const loginFailure = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(AccountActions.loginFailure),
      map(({ error }) =>
        GlobalSettingsActions.showToast({
          toast: {
            id: uuidv4(),
            severity: 'error',
            title: 'Login failed',
            message:
              error.status === 400
                ? 'Invalid credentials'
                : 'An unknown error occurred',
            life: 3600,
          },
        })
      )
    );
  },
  {
    functional: true,
  }
);

export const queryUserInfo = createEffect(
  (actions$ = inject(Actions), accountService = inject(AccountService)) => {
    return actions$.pipe(
      ofType(AccountActions.queryUserInfo),
      exhaustMap(() =>
        accountService.queryUserInfo().pipe(
          map((response) =>
            AccountActions.queryUserInfoSuccess({ queryResponse: response })
          ),
          catchError((error: HttpErrorResponse) =>
            of(AccountActions.queryUserInfoFailure({ error }))
          )
        )
      )
    );
  },
  {
    functional: true,
  }
);

/*    Logout     */
export const logout = createEffect(
  (actions$ = inject(Actions), accountService = inject(AccountService)) => {
    return actions$.pipe(
      ofType(AccountActions.logout),
      exhaustMap((action) =>
        accountService.logout(action.refreshToken).pipe(
          map(() => AccountActions.logoutSuccess()),
          catchError((error: HttpErrorResponse) =>
            of(AccountActions.logoutFailure({ error }))
          )
        )
      )
    );
  },
  {
    functional: true,
  }
);

export const logoutSuccess = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(AccountActions.logoutSuccess),
      tap(() => {
        router.navigate(['home']);
      })
    );
  },
  {
    functional: true,
    dispatch: false,
  }
);

export const logoutFailure = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(AccountActions.logoutFailure),
      map(({ error }) =>
        GlobalSettingsActions.showToast({
          toast: {
            id: uuidv4(),
            severity: 'error',
            title: 'Logout failed',
            message:
              error.status === 400
                ? 'Invalid token'
                : 'An unknown error occurred',
            life: 3600,
          },
        })
      )
    );
  },
  {
    functional: true,
  }
);

/*    Refresh token     */
export const refreshToken = createEffect(
  (actions$ = inject(Actions), accountService = inject(AccountService)) => {
    return actions$.pipe(
      ofType(AccountActions.refreshToken),
      exhaustMap((action) =>
        accountService.refreshToken(action.refreshToken).pipe(
          map((response) =>
            AccountActions.refreshTokenSuccess({
              token: {
                accessToken: response.accessToken,
                refreshToken: response.refreshToken,
                expiresAt: moment().add(response.expiresIn).toDate(),
              },
            })
          ),
          catchError((error) =>
            of(AccountActions.refreshTokenFailure({ error }))
          )
        )
      )
    );
  },
  {
    functional: true,
  }
);

/*    Register     */
export const register = createEffect(
  (actions$ = inject(Actions), accountService = inject(AccountService)) => {
    return actions$.pipe(
      ofType(AccountActions.register),
      exhaustMap((action) =>
        accountService.register(action.newAccount).pipe(
          map(() => AccountActions.registerSuccess()),
          catchError((error) => of(AccountActions.registerFailure({ error })))
        )
      )
    );
  },
  {
    functional: true,
  }
);

export const registerSuccess = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(AccountActions.registerSuccess),
      tap(() => router.navigate(['sign-in'])),
      map(() =>
        GlobalSettingsActions.showToast({
          toast: {
            id: uuidv4(),
            severity: 'success',
            title: 'Registration successful',
            message: 'You can now log in',
            life: 3600,
          },
        })
      )
    );
  },
  {
    functional: true,
  }
);

export const registerFailure = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(AccountActions.registerFailure),
      map(({ error }) =>
        GlobalSettingsActions.showToast({
          toast: {
            id: uuidv4(),
            severity: 'error',
            title: 'Registration failed',
            message:
              error.status === 400
                ? 'Invalid payload'
                : 'An unknown error occurred',
            life: 3600,
          },
        })
      )
    );
  },
  {
    functional: true,
  }
);
