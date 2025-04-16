import { createAction, props } from '@ngrx/store';
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

export const CartActions = {
  addToCart,
  addToCartSuccess,

  removeFromCart,
  removeFromCartSuccess,
};
