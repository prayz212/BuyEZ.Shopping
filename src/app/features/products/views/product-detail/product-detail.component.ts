import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { ButtonGroup } from 'primeng/buttongroup';
import { Rating } from 'primeng/rating';
import { Observable } from 'rxjs';
import { ProductTextPipe } from '../../../../shared/pipes/product-text.pipe';
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
    console.log('addToCart', this.quantity);
  }
}
