import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { OrderService } from '../../../core/services';
import { OrderActions } from './order.actions';

export const queryOrders = createEffect(
  (actions$ = inject(Actions), ordersService = inject(OrderService)) => {
    return actions$.pipe(
      ofType(OrderActions.queryOrders),
      exhaustMap(({ queryRequest }) =>
        ordersService
          .queryOrders(queryRequest)
          .pipe(
            map((response) =>
              OrderActions.queryOrdersSuccess({ queryResponse: response })
            )
          )
      ),
      catchError((error) => of(OrderActions.queryOrdersFailure({ error })))
    );
  },
  {
    functional: true,
  }
);

export const queryOrderDetails = createEffect(
  (actions$ = inject(Actions), ordersService = inject(OrderService)) => {
    return actions$.pipe(
      ofType(OrderActions.queryOrderDetails),
      exhaustMap(({ id }) =>
        ordersService
          .queryOrderDetails(id)
          .pipe(
            map((response) =>
              OrderActions.queryOrderDetailsSuccess({ queryResponse: response })
            )
          )
      ),
      catchError((error) =>
        of(OrderActions.queryOrderDetailsFailure({ error }))
      )
    );
  },
  {
    functional: true,
  }
);
