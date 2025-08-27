import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './apiService.service';
import { ApiResponse } from '../../shared/interfaces/apiResponse.interface';
import { PagedResult } from '../../shared/interfaces/pagedResult.interface';
import { Product } from '../../shared/interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiService = inject(ApiService);

  constructor() { }

  public getProducts (pageNumber: number = 1, pageSize: number = 10): Observable<ApiResponse<PagedResult<Product>>> {
    return this.apiService
      .get<ApiResponse<PagedResult<Product>>>('/products', { page: pageNumber, recordsPerPage:pageSize });
  }

  public getProduct (id: number): Observable<ApiResponse<Product>> {
    return this.apiService.get<ApiResponse<Product>>(`/products/${id}`);
  }

}
