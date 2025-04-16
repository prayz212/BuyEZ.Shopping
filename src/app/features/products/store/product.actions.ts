import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { QueryResponse } from '../../../shared/models/query-response.model';
import { Product, ProductDetail } from '../models/product.model';
import { ProductQueryRequest } from '../models/api.model';

/*  Query products actions  */
const queryProducts = createAction(
  '[Catalog] Query Products',
  props<{ queryRequest: ProductQueryRequest }>()
);
const queryProductsSuccess = createAction(
  '[Catalog] Query Products Success',
  props<{ queryResponse: QueryResponse<Product[]> }>()
);
const queryProductsFailure = createAction(
  '[Catalog] Query Products Failure',
  props<{ error: HttpErrorResponse }>()
);

/*  Query product detail actions  */
const queryProductDetail = createAction(
  '[Catalog] Query Product Detail',
  props<{ id: string }>()
);
const queryProductDetailSuccess = createAction(
  '[Catalog] Query Product Detail Success',
  props<{ queryResponse: ProductDetail }>()
);
const queryProductDetailFailure = createAction(
  '[Catalog] Query Product Detail Failure',
  props<{ error: HttpErrorResponse }>()
);

export const ProductActions = {
  queryProducts,
  queryProductsSuccess,
  queryProductsFailure,

  queryProductDetail,
  queryProductDetailSuccess,
  queryProductDetailFailure,
};
