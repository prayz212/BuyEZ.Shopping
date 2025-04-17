import { OrderStatus } from '../types';

interface Order {
  id: string;
  customerInfo: CustomerInfo;
  status: OrderStatus;
  totalAmount: number;
  createdAt: Date;
}

interface OrderDetail extends Order {
  items: OrderItem[];
  histories: OrderHistory[];
}

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  amount: number;
}

interface OrderHistory {
  id: string;
  status: OrderStatus;
  reason: string;
  createdAt: Date;
}

interface CustomerInfo {
  name: string;
  email: string;
  address: string;
  phoneNumber?: string;
}

export type { CustomerInfo, Order, OrderDetail };
