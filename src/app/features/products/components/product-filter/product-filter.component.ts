import { Component, OnInit } from '@angular/core';
import { SelectItem, SelectItemGroup } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Select } from 'primeng/select';

@Component({
  selector: 'buyez-product-filter',
  imports: [Select, ButtonModule],
  templateUrl: './product-filter.component.html',
})
export class ProductFilterComponent implements OnInit {
  groupedTypes!: SelectItemGroup[];
  priceRanges!: SelectItem[];
  stores!: SelectItem[];

  ngOnInit(): void {
    this.groupedTypes = [
      {
        label: "Men's Fashion",
        value: 'mens-fashion',
        items: [
          { label: 'T-Shirt', value: 'tshirt' },
          { label: 'Pants', value: 'pants' },
          { label: 'Jacket', value: 'jacket' },
        ],
      },
      {
        label: "Women's Fashion",
        value: 'mens-fashion',
        items: [
          { label: 'T-Shirt', value: 'tshirt' },
          { label: 'Pants', value: 'pants' },
          { label: 'Jacket', value: 'jacket' },
        ],
      },
    ];

    this.priceRanges = [
      { label: '$0 to $20', value: 1 },
      { label: '$20 to $50', value: 2 },
      { label: '$50 to $100', value: 3 },
      { label: '$100 to $200', value: 4 },
    ];

    this.stores = [
      { label: 'Lucy', value: 'lucy-tenant-id' },
      { label: 'JNK', value: 'jnk-tenant-id' },
      { label: 'Lucas', value: 'lucas-tenant-id' },
      { label: 'PQJ', value: 'pqj-tenant-id' },
      { label: 'North FS', value: 'nfs-tenant-id' },
    ];
  }
}
