import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { OrderTextPipe } from '../../../../shared/pipes';
import { Order } from '../../models/order.model';
import { OrderStatus } from '../../types';

@Component({
  selector: 'app-order-list',
  imports: [
    TableModule,
    ButtonModule,
    CommonModule,
    MultiSelectModule,
    InputTextModule,
    DropdownModule,
    OrderTextPipe,
  ],
  templateUrl: './order-list.component.html',
})
export class OrderListComponent implements OnInit {
  orders!: Order[];

  selectedOrder!: Order;

  ngOnInit() {
    this.orders = [
      {
        id: 'cbd85752-2ce8-4492-9c8a-c5ca3ce20211',
        customerInfo: {
          name: 'Amy Elsner',
          address: 'New York, NY 10001 USA',
        },
        status: OrderStatus.Packaging,
        totalAmount: 1000,
        createdAt: new Date('2024-04-13T10:00:00Z'),
      },
      {
        id: '1000',
        customerInfo: {
          name: 'Amy Elsner',
          address: 'New York, NY 10001',
        },
        status: OrderStatus.Packaging,
        totalAmount: 1000,
        createdAt: new Date('2024-04-13T10:00:00Z'),
      },
      {
        id: '1000',
        customerInfo: {
          name: 'Amy Elsner',
          address: 'New York, NY 10001',
        },
        status: OrderStatus.Packaging,
        totalAmount: 1000,
        createdAt: new Date('2024-04-13T10:00:00Z'),
      },
      {
        id: '1000',
        customerInfo: {
          name: 'Amy Elsner',
          address: 'New York, NY 10001',
        },
        status: OrderStatus.Packaging,
        totalAmount: 1000,
        createdAt: new Date('2024-04-13T10:00:00Z'),
      },
      {
        id: '1000',
        customerInfo: {
          name: 'Amy Elsner',
          address: 'New York, NY 10001',
        },
        status: OrderStatus.Packaging,
        totalAmount: 1000,
        createdAt: new Date('2024-04-13T10:00:00Z'),
      },
      {
        id: '1000',
        customerInfo: {
          name: 'Amy Elsner',
          address: 'New York, NY 10001',
        },
        status: OrderStatus.Packaging,
        totalAmount: 1000,
        createdAt: new Date('2024-04-13T10:00:00Z'),
      },
      {
        id: '1000',
        customerInfo: {
          name: 'Amy Elsner',
          address: 'New York, NY 10001',
        },
        status: OrderStatus.Packaging,
        totalAmount: 1000,
        createdAt: new Date('2024-04-13T10:00:00Z'),
      },
      {
        id: '1000',
        customerInfo: {
          name: 'Amy Elsner',
          address: 'New York, NY 10001',
        },
        status: OrderStatus.Packaging,
        totalAmount: 1000,
        createdAt: new Date('2024-04-13T10:00:00Z'),
      },
      {
        id: '1000',
        customerInfo: {
          name: 'Amy Elsner',
          address: 'New York, NY 10001',
        },
        status: OrderStatus.Packaging,
        totalAmount: 1000,
        createdAt: new Date('2024-04-13T10:00:00Z'),
      },
      {
        id: '1000',
        customerInfo: {
          name: 'Amy Elsner',
          address: 'New York, NY 10001',
        },
        status: OrderStatus.Packaging,
        totalAmount: 1000,
        createdAt: new Date('2024-04-13T10:00:00Z'),
      },
      {
        id: '1000',
        customerInfo: {
          name: 'Amy Elsner',
          address: 'New York, NY 10001',
        },
        status: OrderStatus.Packaging,
        totalAmount: 1000,
        createdAt: new Date('2024-04-13T10:00:00Z'),
      },
      {
        id: '1000',
        customerInfo: {
          name: 'Amy Elsner',
          address: 'New York, NY 10001',
        },
        status: OrderStatus.Packaging,
        totalAmount: 1000,
        createdAt: new Date('2024-04-13T10:00:00Z'),
      },
    ];
  }
}
