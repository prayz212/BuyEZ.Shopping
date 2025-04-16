import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { CatalogService } from '../../../core/services';
import { ProductActions } from './product.actions';

export const queryProducts = createEffect(
  (actions$ = inject(Actions), catalogService = inject(CatalogService)) => {
    return actions$.pipe(
      ofType(ProductActions.queryProducts),
      exhaustMap(({ queryRequest }) =>
        catalogService
          .queryProducts(queryRequest)
          .pipe(
            map((response) =>
              ProductActions.queryProductsSuccess({ queryResponse: response })
            )
          )
      ),
      catchError((error) => of(ProductActions.queryProductsFailure({ error })))
    );
  },
  {
    functional: true,
  }
);

export const queryProductDetail = createEffect(
  (actions$ = inject(Actions), catalogService = inject(CatalogService)) => {
    return actions$.pipe(
      ofType(ProductActions.queryProductDetail),
      exhaustMap(({ id }) =>
        catalogService
          .queryProductById(id)
          .pipe(
            map((response) =>
              ProductActions.queryProductDetailSuccess({
                queryResponse: response,
              })
            )
          )
      ),
      catchError((error) =>
        of(ProductActions.queryProductDetailFailure({ error }))
      )
    );
  },
  {
    functional: true,
  }
);
