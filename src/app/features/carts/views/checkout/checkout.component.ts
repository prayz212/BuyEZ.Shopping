import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { Observable, take } from 'rxjs';
import { OrderSummaryComponent } from '../../components/order-summary/order-summary.component';
import { CartItem } from '../../models';
import { selectCartItems } from '../../store/cart.selector';

@Component({
  selector: 'app-checkout',
  imports: [
    FloatLabelModule,
    InputTextModule,
    OrderSummaryComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './checkout.component.html',
})
export class CheckoutComponent {
  checkoutForm: FormGroup;
  cartItems$!: Observable<CartItem[]>;

  constructor(private readonly store: Store) {
    this.checkoutForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      address: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
    });

    this.cartItems$ = this.store.select(selectCartItems);
  }

  onSubmit(): void {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }

    this.cartItems$.pipe(take(1)).subscribe((items) => {
      console.log('items', items);
    });
  }
}
