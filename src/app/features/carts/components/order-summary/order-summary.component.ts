import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CartItem } from '../../models';

@Component({
  selector: 'buyez-order-summary',
  imports: [ButtonModule, CommonModule],
  templateUrl: './order-summary.component.html',
})
export class OrderSummaryComponent {
  totalItemsPrice = 0;
  shippingCost: number = 5;

  @Input() cartItems: CartItem[] | null = [];

  @Output() newOrderEvent: EventEmitter<void> = new EventEmitter<void>();

  calculateItemsPrice(): number {
    this.totalItemsPrice =
      this.cartItems?.reduce(
        (totalPrice, item) => totalPrice + item.price * item.quantity,
        0
      ) ?? 0;

    return Math.round((this.totalItemsPrice + Number.EPSILON) * 100) / 100;
  }

  calculateTotalPrice(): number {
    return (
      Math.round(
        (this.totalItemsPrice + this.shippingCost + Number.EPSILON) * 100
      ) / 100
    );
  }

  onPlaceOrder() {
    this.newOrderEvent.emit();
  }
}
