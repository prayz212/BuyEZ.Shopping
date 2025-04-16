import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { ButtonGroup } from 'primeng/buttongroup';
import { Rating } from 'primeng/rating';
import { Observable, take } from 'rxjs';
import { ProductTextPipe } from '../../../../shared/pipes/product-text.pipe';
import { CartItem } from '../../../carts/models';
import { CartActions } from '../../../carts/store/cart.actions';
import { ProductGalleriaComponent } from '../../components/product-galleria/product-galleria.component';
import { ProductDetail } from '../../models/product.model';
import { ProductActions } from '../../store/product.actions';
import { selectDetails, selectError } from '../../store/product.selectors';

@Component({
  selector: 'app-product-detail',
  imports: [
    ProductGalleriaComponent,
    ButtonModule,
    ButtonGroup,
    Rating,
    CommonModule,
    ProductTextPipe,
  ],
  templateUrl: './product-detail.component.html',
})
export class ProductDetailComponent implements OnInit {
  product$: Observable<ProductDetail | null>;
  quantity = 1;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly store: Store,
    private readonly actions$: Actions
  ) {
    this.product$ = this.store.select(selectDetails);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((queryParams) => {
      if (!queryParams.has('id')) {
        this.router.navigate(['/products'], { replaceUrl: true });
        return;
      }

      const id = queryParams.get('id')!;
      this.store.dispatch(ProductActions.queryProductDetail({ id }));
    });

    this.store.select(selectError).subscribe((error) => {
      if (error) {
        this.router.navigate(['/products'], { replaceUrl: true });
      }
    });

    this.actions$
      .pipe(ofType(CartActions.addToCartSuccess), take(1))
      .subscribe(() => this.resetQuantity());
  }

  decrementQuantity() {
    this.quantity--;
  }

  incrementQuantity() {
    this.quantity++;
  }

  resetQuantity() {
    this.quantity = 0;
  }

  addToCart() {
    /* 
      Purpose of take(1):
      - Ensures we only get the current product value
      - Automatically unsubscribes after getting the value
    */
    this.product$.pipe(take(1)).subscribe((product) => {
      if (!product) return;

      const item: CartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: this.quantity,
      };

      this.store.dispatch(CartActions.addToCart({ item }));
    });
  }
}
