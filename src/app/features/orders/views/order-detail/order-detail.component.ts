import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { FieldsetModule } from 'primeng/fieldset';
import { TableModule } from 'primeng/table';
import { Timeline } from 'primeng/timeline';
import { Observable } from 'rxjs';
import { OrderTextPipe } from '../../../../shared/pipes';
import { UserInfo } from '../../../accounts/models/token.model';
import { selectUserInfo } from '../../../accounts/store/account.selectors';
import { OrderDetail } from '../../models/order.model';
import { OrderActions } from '../../store/order.actions';
import { selectOrderDetail } from '../../store/order.selectors';

@Component({
  selector: 'app-order-detail',
  imports: [
    OrderTextPipe,
    FieldsetModule,
    Timeline,
    TableModule,
    RouterModule,
    CommonModule,
  ],
  templateUrl: './order-detail.component.html',
})
export class OrderDetailComponent implements OnInit {
  orderDetail$: Observable<OrderDetail | null>;
  userInfo$: Observable<UserInfo | null>;

  constructor(
    private readonly store: Store,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    this.orderDetail$ = this.store.select(selectOrderDetail);
    this.userInfo$ = this.store.select(selectUserInfo);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((queryParams) => {
      if (!queryParams.has('id')) {
        this.router.navigate(['/orders'], { replaceUrl: true });
        return;
      }
      const id = queryParams.get('id')!;
      this.store.dispatch(OrderActions.queryOrderDetails({ id }));
    });
  }
}
