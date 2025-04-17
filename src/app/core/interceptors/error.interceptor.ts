import {
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpStatusCode,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  catchError,
  exhaustMap,
  from,
  switchMap,
  take,
  throwError,
} from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { AccountActions } from '../../features/accounts/store/account.actions';
import { selectRefreshToken } from '../../features/accounts/store/account.selectors';
import { GlobalSettingsActions } from '../../store/global.actions';
import { AccountService } from '../services';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);
  const actions$ = inject(Actions);
  const accountService = inject(AccountService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error) => {
      console.error('Error interceptor: ' + JSON.stringify(error));

      const httpError = error as HttpErrorResponse;
      if (httpError.status === HttpStatusCode.Unauthorized) {
        return from(store.select(selectRefreshToken)).pipe(
          take(1),
          exhaustMap((refreshToken) => {
            if (!refreshToken) {
              redirectToLoginPage(accountService, router);
              return throwError(() => new Error('No refresh token available'));
            }

            store.dispatch(AccountActions.refreshToken({ refreshToken }));

            return actions$.pipe(
              ofType(
                AccountActions.refreshTokenSuccess,
                AccountActions.refreshTokenFailure
              ),
              take(1),
              switchMap((action) => {
                if (action.type === AccountActions.refreshTokenSuccess.type) {
                  return next(
                    req.clone({
                      setHeaders: {
                        Authorization: `Bearer ${action.token.accessToken}`,
                      },
                    })
                  );
                }

                redirectToLoginPage(accountService, router);
                store.dispatch(
                  GlobalSettingsActions.showToast({
                    toast: {
                      id: uuidv4(),
                      severity: 'error',
                      title: 'Session Expired',
                      message: 'Your login session already expired!',
                      life: 3000,
                    },
                  })
                );

                return throwError(() => new Error('Refresh token failed'));
              })
            );
          })
        );
      }

      return throwError(() => error as HttpErrorResponse);
    })
  );
};

const redirectToLoginPage = (
  accountService: AccountService,
  router: Router
) => {
  accountService.deleteTokens();
  router.navigate(['sign-in']);
};
