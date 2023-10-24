import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsListComponent } from './products-list.component';
import { ProductsService } from 'src/app/core/services/products.service';
import { of } from 'rxjs';
import { Product } from 'src/app/core/interfaces/product.interface';
import { Router } from '@angular/router';

describe('ProductsListComponent', () => {
  let component: ProductsListComponent;
  let fixture: ComponentFixture<ProductsListComponent>;
  let productsService: ProductsService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsListComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule],
      providers: [ ProductsService,  {
        provide: Router,
        useClass: class {
          navigate = jasmine.createSpy('navigate');
        },
      }, ]
    });
    fixture = TestBed.createComponent(ProductsListComponent);
    component = fixture.componentInstance;
    productsService = TestBed.inject(ProductsService);
    component.tableConfig = {
      header: [],
      pagination: {
        page: 1,
        pageSize: 5,
        pageOptions: [5, 10, 20],
        totalPages: 0,
      }
    };
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch and update products getAllProducts()', () => {
    const mockProducts: Product[] = [
      {
        id: 'exampleId',
        name: 'Example Product',
        description: 'This is an example product.',
        logo: 'example-logo.png',
        date_release: '2023-10-25',
        date_revision: '2024-10-26'
      },
      {
        id: 'exampleId2',
        name: 'Example Product 2',
        description: 'This is an example product 2.',
        logo: 'example-logo2.png',
        date_release: '2023-10-25',
        date_revision: '2024-10-26'
      }
    ];

    spyOn(component, 'setDataToShow').and.returnValue();
    spyOn(productsService, 'getProducts').and.returnValue(of(mockProducts));
    component.getAllProducts();

    expect(component.products).toEqual(mockProducts);
    expect(component.searchedProducts).toEqual(mockProducts);
    expect(component.setDataToShow).toHaveBeenCalled();
  });

  it('should update searchedProducts and call setDataToShow on searchControl value changes, configSearch()', fakeAsync(() => {
    const mockSearchTerm = 'Product 1';

    component.configSearch();

    component.searchControl.setValue(mockSearchTerm);

    tick(300);

    expect(component.tableConfig.pagination.page).toBe(1);

    expect(component.searchedProducts).toEqual([]);
  }));


  it('should update page and call setDataToShow', () => {
    const mockPage = 2;
    spyOn(component, 'setDataToShow').and.returnValue();

    component.changePage(mockPage);

    expect(component.tableConfig.pagination.page).toBe(mockPage);

    expect(component.setDataToShow).toHaveBeenCalled();
  });

  it('should update page to 1 and call setDataToShow on changePageSize', () => {
    spyOn(component, 'setDataToShow').and.returnValue();

    component.changePageSize();

    expect(component.tableConfig.pagination.page).toBe(1);

    expect(component.setDataToShow).toHaveBeenCalled();
  });

  it('should navigate to product registration', () => {
    component.reditectToProductRegistration();

    expect(router.navigate).toHaveBeenCalledWith(['/products/product-registration']);
  });
});
