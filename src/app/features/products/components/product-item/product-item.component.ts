import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Product } from '../../models/product.model';

@Component({
  selector: 'buyez-product-item',
  imports: [RouterModule],
  templateUrl: './product-item.component.html',
})
export class ProductItemComponent {
  @Input() product!: Product;
}
