import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { OrderService } from '../../../core/services';
import { GlobalSettingsActions } from '../../../store/global.actions';
import { CartActions } from './cart.actions';

export const addToCart = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(CartActions.addToCart),
      map(({ item }) => CartActions.addToCartSuccess({ name: item.name }))
    );
  },
  {
    functional: true,
  }
);

export const addToCartSuccess = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(CartActions.addToCartSuccess),
      map(({ name }) =>
        GlobalSettingsActions.showToast({
          toast: {
            id: uuidv4(),
            severity: 'success',
            title: 'Added to cart',
            message: `${name} has been added to your cart`,
            life: 3000,
          },
        })
      )
    );
  },
  {
    functional: true,
  }
);

export const removeFromCart = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(CartActions.removeFromCart),
      map(({ item }) => CartActions.removeFromCartSuccess({ name: item.name }))
    );
  },
  {
    functional: true,
  }
);

export const removeFromCartSuccess = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(CartActions.removeFromCartSuccess),
      map(({ name }) =>
        GlobalSettingsActions.showToast({
          toast: {
            id: uuidv4(),
            severity: 'success',
            title: 'Removed from cart',
            message: `${name} has been removed from your cart`,
            life: 3000,
          },
        })
      )
    );
  },
  {
    functional: true,
  }
);

export const placeOrder = createEffect(
  (actions$ = inject(Actions), orderService = inject(OrderService)) => {
    return actions$.pipe(
      ofType(CartActions.placeOrder),
      exhaustMap(({ customerInfo, items }) =>
        orderService.addOrder({ customerInfo, items }).pipe(
          map(({ id }) => CartActions.placeOrderSuccess({ orderId: id })),
          catchError((error: HttpErrorResponse) =>
            of(CartActions.placeOrderFailure({ error }))
          )
        )
      )
    );
  },
  {
    functional: true,
  }
);

export const placeOrderSuccess = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(CartActions.placeOrderSuccess),
      tap(({ orderId }) => router.navigate(['order-history', orderId]))
    );
  },
  {
    functional: true,
    dispatch: false,
  }
);
