import { OrderStatus } from '../types';

interface Order {
  id: string;
  customerInfo: CustomerInfo;
  status: OrderStatus;
  totalAmount: number;
  createdAt: Date;
}

interface CustomerInfo {
  name: string;
  address: string;
  phoneNumber?: string;
}

export type { CustomerInfo, Order };
