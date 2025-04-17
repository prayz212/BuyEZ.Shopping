import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { Observable } from 'rxjs';
import { OrderTextPipe } from '../../../../shared/pipes';
import { Order } from '../../models/order.model';
import { OrderActions } from '../../store/order.actions';
import { selectOrders, selectTotalCount } from '../../store/order.selectors';

@Component({
  selector: 'app-order-list',
  imports: [
    TableModule,
    CommonModule,
    MultiSelectModule,
    InputTextModule,
    DropdownModule,
    OrderTextPipe,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './order-list.component.html',
})
export class OrderListComponent implements OnInit {
  orders$!: Observable<Order[]>;
  totalRecords$!: Observable<number>;

  constructor(private readonly store: Store) {
    this.orders$ = this.store.select(selectOrders);
    this.totalRecords$ = this.store.select(selectTotalCount);
  }

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders(page: number = 1, size: number = 10) {
    this.store.dispatch(
      OrderActions.queryOrders({
        queryRequest: { pageNumber: page, pageSize: size },
      })
    );
  }

  onPageChange(event: any) {
    this.loadOrders(event.page, event.rows);
  }
}
