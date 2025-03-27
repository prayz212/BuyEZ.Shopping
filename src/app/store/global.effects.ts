import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MessageService } from 'primeng/api';
import { delayWhen, map, tap, timer } from 'rxjs';
import { GlobalSettingsActions } from './global.actions';

/*    Toast     */
export const showToast = createEffect(
  (actions$ = inject(Actions), messageService = inject(MessageService)) => {
    return actions$.pipe(
      ofType(GlobalSettingsActions.showToast),
      tap(({ toast: { id, severity, title, message, life } }) =>
        messageService.add({
          id,
          severity,
          summary: title,
          detail: message,
          life,
        })
      ),

      // Wait for the specified lifetime (in milliseconds)
      delayWhen(({ toast: { life } }) => timer(life)),
      map(({ toast: { id } }) => GlobalSettingsActions.hideToast({ id }))
    );
  },
  {
    functional: true,
  }
);

export const hideToast = createEffect(
  (actions$ = inject(Actions), messageService = inject(MessageService)) => {
    return actions$.pipe(
      ofType(GlobalSettingsActions.hideToast),
      tap(({ id }) => messageService.clear(id))
    );
  },
  {
    functional: true,
    dispatch: false,
  }
);
