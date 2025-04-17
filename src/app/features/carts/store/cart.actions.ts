import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { CustomerInfo } from '../../orders/models/order.model';
import { CartItem } from '../models';

/*  Add to cart actions  */
const addToCart = createAction(
  '[Cart] Add To Cart',
  props<{ item: CartItem }>()
);
const addToCartSuccess = createAction(
  '[Cart] Add To Cart Success',
  props<{ name: string }>()
);

/*  Remove from cart actions  */
const removeFromCart = createAction(
  '[Cart] Remove From Cart',
  props<{ item: CartItem }>()
);
const removeFromCartSuccess = createAction(
  '[Cart] Remove From Cart Success',
  props<{ name: string }>()
);

/*  Place order actions  */
const placeOrder = createAction(
  '[Cart] Place Order',
  props<{ customerInfo: CustomerInfo; items: CartItem[] }>()
);
const placeOrderSuccess = createAction(
  '[Cart] Place Order Success',
  props<{ orderId: string }>()
);
const placeOrderFailure = createAction(
  '[Cart] Place Order Failure',
  props<{ error: HttpErrorResponse }>()
);

export const CartActions = {
  addToCart,
  addToCartSuccess,

  removeFromCart,
  removeFromCartSuccess,

  placeOrder,
  placeOrderSuccess,
  placeOrderFailure,
};
