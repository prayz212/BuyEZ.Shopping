import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { delay, finalize } from 'rxjs';
import { LoadingService } from '../services';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  loadingService.loadingStart();

  return next(req).pipe(
    delay(200), // Just to test loading effects
    finalize(() => loadingService.loadingStop())
  );
};
