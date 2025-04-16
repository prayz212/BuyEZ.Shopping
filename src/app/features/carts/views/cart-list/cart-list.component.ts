import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Observable, take } from 'rxjs';
import { CartItem } from '../../models';
import { CartActions } from '../../store/cart.actions';
import { selectCartItems } from '../../store/cart.selector';

@Component({
  selector: 'app-cart-list',
  imports: [TableModule, ButtonModule, RouterModule, CommonModule],
  templateUrl: './cart-list.component.html',
})
export class CartListComponent {
  cartItems$!: Observable<CartItem[]>;

  constructor(private readonly store: Store) {
    this.cartItems$ = this.store.select(selectCartItems);
  }

  removeCartItem(id: string) {
    this.cartItems$.pipe(take(1)).subscribe((items) => {
      const removingItem = items.find((i) => i.id === id)!;
      return this.store.dispatch(
        CartActions.removeFromCart({ item: removingItem })
      );
    });
  }

  calculateItemsPrice(): number {
    let totalItemsPrice = 0;
    this.cartItems$.pipe(take(1)).subscribe((items) => {
      const total =
        items.reduce(
          (totalPrice, item) => totalPrice + item.price * item.quantity,
          0
        ) ?? 0;

      totalItemsPrice = Math.round((total + Number.EPSILON) * 100) / 100;
    });

    return totalItemsPrice;
  }
}
