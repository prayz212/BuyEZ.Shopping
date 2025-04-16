import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { Observable } from 'rxjs';
import { CatalogService } from '../../../../core/services';
import { ProductFilterComponent } from '../../components/product-filter/product-filter.component';
import { ProductItemComponent } from '../../components/product-item/product-item.component';
import { Product } from '../../models/product.model';
import { ProductActions } from '../../store/product.actions';
import {
  selectError,
  selectProducts,
  selectTotalCount,
} from '../../store/product.selectors';

@Component({
  selector: 'app-product-list',
  imports: [
    ProductFilterComponent,
    ProductItemComponent,
    PaginatorModule,
    CommonModule,
  ],
  providers: [CatalogService],
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit {
  products$!: Observable<Product[]>;
  totalRecords$!: Observable<number>;
  error$!: Observable<any>;
  rows: number;

  constructor(private readonly store: Store) {
    this.rows = 10;

    this.products$ = this.store.select(selectProducts);
    this.totalRecords$ = this.store.select(selectTotalCount);
    this.error$ = this.store.select(selectError);
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(page: number = 1, size: number = this.rows) {
    this.store.dispatch(
      ProductActions.queryProducts({
        queryRequest: { pageNumber: page, pageSize: size },
      })
    );
  }

  onPageChange(event: PaginatorState) {
    if (event.page) this.loadProducts(event.page + 1, this.rows);
  }
}
