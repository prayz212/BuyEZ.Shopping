import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { QueryResponse } from '../../../shared/models/query-response.model';
import { OrderQueryRequest } from '../models/api.model';
import { Order, OrderDetail } from '../models/order.model';

/*  Query orders actions  */
const queryOrders = createAction(
  '[Orders] Query Orders',
  props<{ queryRequest: OrderQueryRequest }>()
);
const queryOrdersSuccess = createAction(
  '[Orders] Query Orders Success',
  props<{ queryResponse: QueryResponse<Order[]> }>()
);
const queryOrdersFailure = createAction(
  '[Orders] Query Orders Failure',
  props<{ error: HttpErrorResponse }>()
);

/*  Query order details actions  */
const queryOrderDetails = createAction(
  '[Orders] Query Order Details',
  props<{ id: string }>()
);
const queryOrderDetailsSuccess = createAction(
  '[Orders] Query Order Details Success',
  props<{ queryResponse: OrderDetail }>()
);
const queryOrderDetailsFailure = createAction(
  '[Orders] Query Order Details Failure',
  props<{ error: HttpErrorResponse }>()
);

export const OrderActions = {
  queryOrders,
  queryOrdersSuccess,
  queryOrdersFailure,

  queryOrderDetails,
  queryOrderDetailsSuccess,
  queryOrderDetailsFailure,
};
