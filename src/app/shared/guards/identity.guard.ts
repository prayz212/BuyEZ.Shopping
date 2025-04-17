import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { selectIsAuthenticated } from '../../features/accounts/store/account.selectors';
import { GlobalSettingsActions } from '../../store/global.actions';

export const identityGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectIsAuthenticated).pipe(
    take(1),
    map((isAuthenticated) => {
      if (isAuthenticated) {
        return true;
      }

      store.dispatch(
        GlobalSettingsActions.showToast({
          toast: {
            id: uuidv4(),
            title: 'Unauthorized access',
            message: 'You need to login before access to this resource.',
            life: 3600,
            severity: 'warn',
          },
        })
      );

      router.navigate(['sign-in']);
      return false;
    })
  );
};
