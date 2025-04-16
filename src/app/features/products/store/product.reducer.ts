import { HttpErrorResponse } from '@angular/common/http';
import { createReducer, on } from '@ngrx/store';
import { Product, ProductDetail } from '../models/product.model';
import { ProductActions } from './product.actions';

export const productFeatureKey = 'product';

export interface ProductState {
  products: Product[];
  details: ProductDetail | null;
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  error: HttpErrorResponse | null;
}

export const initialState: ProductState = {
  products: [],
  details: null,
  pageNumber: 1,
  totalPages: 0,
  totalCount: 0,
  error: null,
};

export const productReducer = createReducer(
  initialState,

  /*  Query products reducers  */
  on(ProductActions.queryProducts, (state) => ({
    ...state,
    error: null,
  })),
  on(ProductActions.queryProductsSuccess, (state, { queryResponse }) => ({
    ...state,
    products: queryResponse.items,
    pageNumber: queryResponse.pageNumber,
    totalPages: queryResponse.totalPages,
    totalCount: queryResponse.totalCount,
  })),
  on(ProductActions.queryProductsFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  /*  Query product detail reducers  */
  on(ProductActions.queryProductDetail, (state) => ({
    ...state,
    error: null,
  })),
  on(ProductActions.queryProductDetailSuccess, (state, { queryResponse }) => ({
    ...state,
    details: queryResponse,
  })),
  on(ProductActions.queryProductDetailFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
