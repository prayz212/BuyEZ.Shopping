import { ImageDetail } from '../../../shared/models/image.model';
import { ProductStatus, ProductType } from '../types';

interface Product {
  id: string;
  name: string;
  price: number;
  type: ProductType;
  image: ImageDetail;
}

interface ProductDetail {
  id: string;
  name: string;
  description: string;
  price: number;
  type: ProductType;
  status: ProductStatus;
  // images: ImageDetail[];
}

export type { Product, ProductDetail };
