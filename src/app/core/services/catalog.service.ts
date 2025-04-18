import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductQueryRequest } from '../../features/products/models/api.model';
import {
  Product,
  ProductDetail,
} from '../../features/products/models/product.model';
import { QueryResponse } from '../../shared/models/query-response.model';

@Injectable()
export class CatalogService {
  private readonly prefix = 'catalogs';

  constructor(private readonly http: HttpClient) {}

  queryProducts(
    queryPayload: ProductQueryRequest
  ): Observable<QueryResponse<Product[]>> {
    return this.http.post<QueryResponse<Product[]>>(
      `${this.prefix}/query`,
      queryPayload
    );
  }

  queryProductById(id: string): Observable<ProductDetail> {
    return this.http.get<ProductDetail>(`${this.prefix}/${id}`);
  }
}
