import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  NewOrderRequest,
  OrderQueryRequest,
} from '../../features/orders/models/api.model';
import { Order, OrderDetail } from '../../features/orders/models/order.model';
import { QueryResponse } from '../../shared/models/query-response.model';

@Injectable()
export class OrderService {
  private readonly prefix = 'order';

  constructor(private readonly http: HttpClient) {}

  addOrder(addPayload: NewOrderRequest): Observable<OrderDetail> {
    return this.http.post<OrderDetail>(`${this.prefix}`, addPayload);
  }

  queryOrders(
    queryPayload: OrderQueryRequest
  ): Observable<QueryResponse<Order[]>> {
    return this.http.post<QueryResponse<Order[]>>(
      `${this.prefix}/query`,
      queryPayload
    );
  }

  queryOrderDetails(id: string): Observable<OrderDetail> {
    return this.http.get<OrderDetail>(`${this.prefix}/${id}`);
  }
}
