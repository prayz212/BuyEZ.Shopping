import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, catchError, switchMap, take, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AccountActions } from '../../features/accounts/store/account.actions';
import {
  selectAccessToken,
  selectRefreshToken,
} from '../../features/accounts/store/account.selectors';
import { AccountService } from '../services/account.service';

export const apiInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  /*  Adding apis prefix  */
  const apiReq = req.clone({
    url: `${environment.apiBaseUrl}/${environment.apiVersion}/api/${req.url}`,
  });

  /*  Skip authentication for public endpoints  */
  console.log('Need token: ' + isPublicEndpoint(req.url));

  if (isPublicEndpoint(req.url)) {
    return next(apiReq);
  }

  const store = inject(Store);

  /*  Add authentication headers  */
  let accessToken: string | undefined;
  store
    .select(selectAccessToken)
    .pipe(take(1)) // Take the first emitted value and complete
    .subscribe((token) => (accessToken = token));

  if (accessToken) {
    apiReq.headers.set('Authorization', `Bearer ${accessToken}`);
  }

  return next(apiReq).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return handleUnauthorizedError(req, next);
      }

      return throwError(() => error);
    })
  );
};

const isPublicEndpoint = (url: string) => {
  /*  Add your public endpoints here  */
  const publicEndpoints = ['/catalog', '/identity'];
  return publicEndpoints.some((endpoint) => url.startsWith(endpoint));
};

// TODO: Improve the way we inject services
const handleUnauthorizedError = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  const store = inject(Store);
  let refreshToken: string | undefined;

  store
    .select(selectRefreshToken)
    .pipe(take(1)) // Take the first emitted value and complete
    .subscribe((token) => (refreshToken = token));

  /*  No refresh token available, redirect to login page  */
  if (!refreshToken) {
    redirectToLoginPage();
    return throwError(() => new Error('No refresh token available'));
  }

  return inject(AccountService)
    .refreshToken(refreshToken)
    .pipe(
      // Why we need to switchMap here?
      switchMap((response) => {
        store.dispatch(
          AccountActions.loginSuccess({
            token: {
              accessToken: response.accessToken,
              refreshToken: response.refreshToken,
              expiresAt: new Date(Date.now() + response.expiresIn),
            },
          })
        );

        // Why we need to use refreshTokenSubject here?
        // this.refreshTokenSubject.next(response.accessToken);

        return next(
          req.clone({
            setHeaders: { Authorization: `Bearer ${response.accessToken}` },
          })
        );
      }),
      catchError((error) => {
        inject(Store).dispatch(AccountActions.refreshTokenFailure({ error }));
        redirectToLoginPage();

        return throwError(() => error);
      })
    );
};

const redirectToLoginPage = () => {
  inject(AccountService).deleteTokens();
  inject(Router).navigate(['sign-in']);
};
