import { createReducer, on } from '@ngrx/store';
import { CartItem } from '../models';
import { CartActions } from './cart.actions';

export const cartFeatureKey = 'cart';

export interface CartState {
  items: CartItem[];
}

export const initialState: CartState = {
  items: [],
};

export const cartReducer = createReducer(
  initialState,

  /*  Add to cart reducers  */
  on(CartActions.addToCart, (state, { item }) => {
    const existingItem = state.items.find((i) => i.id === item.id);
    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + item.quantity,
      };

      return {
        ...state,
        items: state.items.map((i) => (i.id === item.id ? updatedItem : i)),
      };
    }

    return {
      ...state,
      items: [...state.items, item],
    };
  }),

  /*  Remove from cart reducers  */
  on(CartActions.removeFromCart, (state, { item: { id } }) => ({
    ...state,
    items: [...state.items.filter((item) => item.id !== id)],
  })),

  /*  Place order reducers  */
  on(CartActions.placeOrderSuccess, (state) => ({
    ...state,
    items: [],
  }))
);
