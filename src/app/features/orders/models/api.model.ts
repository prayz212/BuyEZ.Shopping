import { CartItem } from '../../carts/models';
import { CustomerInfo } from './order.model';

interface NewOrderRequest {
  customerInfo: CustomerInfo;
  items: CartItem[];
}

interface OrderQueryRequest {
  pageNumber: number;
  pageSize: number;
}

export type { NewOrderRequest, OrderQueryRequest };
