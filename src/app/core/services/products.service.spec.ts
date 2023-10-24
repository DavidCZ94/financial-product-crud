import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductsService } from './products.service';
import { Product } from '../interfaces/product.interface';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ProductsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get products', () => {
    const mockProducts: Product[] = [
      { id: '1', name: 'Product 1', description: 'Description 1', logo: 'logo1', date_release: '2023-01-01', date_revision: '2023-02-01' },
      { id: '2', name: 'Product 2', description: 'Description 2', logo: 'logo2', date_release: '2023-03-01', date_revision: '2023-04-01' }
    ];

    service.getProducts().subscribe((products) => {
      expect(products).toEqual(mockProducts);
    });

    const req = httpTestingController.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('GET');

    req.flush(mockProducts);

    httpTestingController.verify();
  });

  it('should check if product ID exists', () => {
    const productId = '123';
    const response = true;

    service.productIdExist(productId).subscribe((result) => {
      expect(result).toBe(response);
    });

    const req = httpTestingController.expectOne(`${service['apiUrl']}/verification?id=${productId}`);
    expect(req.request.method).toBe('GET');

    req.flush(response);

    httpTestingController.verify();
  });

  it('should create a product', () => {
    const newProduct: any = {
      name: 'New Product',
      description: 'Description for the new product',
      logo: 'new-logo',
      date_release: '2023-11-01',
      date_revision: '2024-11-01'
    };
    const mockProduct: Product = {
      id: '123',
      ...newProduct
    };

    service.createProduct(newProduct).subscribe((product) => {
      expect(product).toEqual(mockProduct);
    });

    const req = httpTestingController.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('POST');

    req.flush(mockProduct);

    httpTestingController.verify();
  });
});
