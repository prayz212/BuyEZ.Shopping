import { Pipe, PipeTransform } from '@angular/core';
import { OrderStatus } from '../../features/orders/types';
import TextTransformType from './text-transform-type';

const SUPPORTED_TRANSFORMATIONS: TextTransformType[] = [
  {
    key: 'status',
    transformFn: (value: any): string => {
      switch (value as OrderStatus) {
        case OrderStatus.Cancelled:
          return 'Cancelled';
        case OrderStatus.Delivering:
          return 'Delivering';
        case OrderStatus.Delivered:
          return 'Delivered';
        case OrderStatus.Packaging:
          return 'Packaging';
        case OrderStatus.Paid:
          return 'Paid';
        case OrderStatus.Pending:
          return 'Pending';
        default:
          return '';
      }
    },
  },
  {
    key: 'id',
    transformFn: (value: any): string => {
      const id = value as string;
      const idSplit = id.split('-');
      return idSplit[idSplit.length - 1].toUpperCase();
    },
  },
];

@Pipe({
  name: 'ordertext',
})
export class OrderTextPipe implements PipeTransform {
  transform(value: number, enumerationName: any): string | null {
    const transform = SUPPORTED_TRANSFORMATIONS.find(
      (transformation) => transformation.key === enumerationName
    );

    if (!transform) return null;

    return transform.transformFn(value);
  }
}
