import { HttpErrorResponse } from '@angular/common/http';
import { createReducer, on } from '@ngrx/store';
import { Order, OrderDetail } from '../models/order.model';
import { OrderActions } from './order.actions';

export const orderFeatureKey = 'order';

export interface OrderState {
  orders: Order[];
  details: OrderDetail | null;
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  error: HttpErrorResponse | null;
}

export const initialState: OrderState = {
  orders: [],
  details: null,
  pageNumber: 1,
  totalPages: 0,
  totalCount: 0,
  error: null,
};

export const orderReducer = createReducer(
  initialState,

  /*  Query orders reducers  */
  on(OrderActions.queryOrders, (state) => ({
    ...state,
    error: null,
  })),
  on(OrderActions.queryOrdersSuccess, (state, { queryResponse }) => ({
    ...state,
    orders: queryResponse.items,
    pageNumber: queryResponse.pageNumber,
    totalPages: queryResponse.totalPages,
    totalCount: queryResponse.totalCount,
  })),
  on(OrderActions.queryOrdersFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  /*  Query order details reducers  */
  on(OrderActions.queryOrderDetails, (state) => ({
    ...state,
    error: null,
  })),
  on(OrderActions.queryOrderDetailsSuccess, (state, { queryResponse }) => ({
    ...state,
    details: queryResponse,
  })),
  on(OrderActions.queryOrderDetailsFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
