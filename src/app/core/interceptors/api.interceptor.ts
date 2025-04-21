import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, switchMap, take } from 'rxjs';
import { environment } from '../../../environments/environment';
import { selectAccessToken } from '../../features/accounts/store/account.selectors';

export const apiInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  /*  Adding apis prefix  */
  const apiUrl = `${environment.apiVersion}/api/${req.url}`;

  /*  Skip authentication for public endpoints  */
  console.log('Need token: ' + !isPublicEndpoint(req.url));

  if (isPublicEndpoint(req.url)) {
    return next(req.clone({ url: apiUrl }));
  }

  const store = inject(Store);

  /*  Add authentication headers  */
  /*
    Purpose of take(1):
    - Ensures we only get the current access token value
    - Automatically unsubscribes after getting the value
  */
  return store.select(selectAccessToken).pipe(
    take(1),
    switchMap((accessToken) =>
      next(
        req.clone({
          url: apiUrl,
          setHeaders: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        })
      )
    )
  );
};

const isPublicEndpoint = (url: string) => {
  /*  Add your public endpoints here  */
  const publicEndpoints = ['catalogs', 'identities'];
  const excludePublicEndpoints = ['identities/user-info'];

  return (
    publicEndpoints.some((endpoint) => url.startsWith(endpoint)) &&
    !excludePublicEndpoints.includes(url)
  );
};
