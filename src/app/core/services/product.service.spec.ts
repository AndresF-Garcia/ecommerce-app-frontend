import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ProductService } from './product.service';
import { ApiService } from './apiService.service';
import { ApiResponse } from '../../shared/interfaces/apiResponse.interface';
import { PagedResult } from '../../shared/interfaces/pagedResult.interface';
import { Product } from '../../shared/interfaces/product.interface';

describe('ProductService', () => {
  let service: ProductService;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ApiService', ['get']);

    TestBed.configureTestingModule({
      providers: [
        ProductService,
        { provide: ApiService, useValue: spy }
      ]
    });

    service = TestBed.inject(ProductService);
    apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getProducts', () => {
    it('should call ApiService.get with correct URL and params', () => {
      const mockResponse: ApiResponse<PagedResult<Product>> = {
        success: true,
        message: '',
        data: {
          totalCount: 10,
          pageNumber: 2,
          pageSize: 5,
          totalPages: 2,
          items: [{ id: 1, title: 'Test Product', price: 100, description: 'Test Description' }]
        }
      };

      apiServiceSpy.get.and.returnValue(of(mockResponse));

      service.getProducts(2, 5).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      expect(apiServiceSpy.get).toHaveBeenCalledWith('/products', { page: 2, recordsPerPage: 5 });
    });
  });

});
