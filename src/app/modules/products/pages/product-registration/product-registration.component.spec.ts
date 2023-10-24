import { ComponentFixture, TestBed, tick } from '@angular/core/testing';

import { ProductRegistrationComponent } from './product-registration.component';
import { ProductsService } from 'src/app/core/services/products.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('ProductRegistrationComponent', () => {
  let component: ProductRegistrationComponent;
  let fixture: ComponentFixture<ProductRegistrationComponent>;
  let datePipe: DatePipe;
  let productsService: ProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductRegistrationComponent],
      providers: [ProductsService, DatePipe],
      imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule],
    });
    fixture = TestBed.createComponent(ProductRegistrationComponent);
    component = fixture.componentInstance;
    datePipe = TestBed.inject(DatePipe);
    productsService = TestBed.inject(ProductsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update date_revision when date_release changes, setRevisionDate()', () => {
    component.profileForm.setValue({
      id: 'exampleId',
      name: 'Example Product',
      description: 'This is an example product.',
      logo: 'example-logo.png',
      date_release: '2023-10-25',
      date_revision: '',
    });
    const dateReleaseControl = component.profileForm.get('date_release');
    const dateRevisionControl = component.profileForm.get('date_revision');

    dateReleaseControl?.setValue('2023-10-25');

    dateReleaseControl?.updateValueAndValidity();

    const aYearAfter = new Date('2023-10-25');
    aYearAfter.setFullYear(aYearAfter.getFullYear() + 1);
    aYearAfter.setDate(aYearAfter.getDate() + 1);

    const expectedDate = datePipe.transform(aYearAfter, 'yyyy-MM-dd');

    expect(dateRevisionControl?.value).toBe(expectedDate);

    expect(dateRevisionControl?.enabled).toBeFalsy();
  });

  it('should submit the form and update date_revision , submit()', () => {
    component.profileForm.setValue({
      id: 'exampleId',
      name: 'Example Product',
      description: 'This is an example product.',
      logo: 'example-logo.png',
      date_release: '2023-10-25',
      date_revision: '',
    });

    spyOn(component, 'createProduct');

    component.submit();

    const aYearAfter = new Date('2023-10-25');
    aYearAfter.setFullYear(aYearAfter.getFullYear() + 1);
    aYearAfter.setDate(aYearAfter.getDate() + 1);
    const expectedDate = datePipe.transform(aYearAfter, 'yyyy-MM-dd');

    expect(component.profileForm.get('date_revision')?.value).toBe(expectedDate);
    expect(component.profileForm.get('date_revision')?.enabled).toBeFalsy();

    expect(component.createProduct).toHaveBeenCalled();
  });

  it('should stop event propagation and prevent default form reset behavior', () => {
    const mockEvent = new CustomEvent('mockEvent');
    spyOn(mockEvent, 'stopPropagation');
    spyOn(mockEvent, 'preventDefault');

    component.reset(mockEvent);

    expect(mockEvent.stopPropagation).toHaveBeenCalled();
    expect(mockEvent.preventDefault).toHaveBeenCalled();

    expect(component.profileForm.value.id).toEqual(null);
    expect(component.profileForm.value.name).toEqual(null);
    expect(component.profileForm.value.description).toEqual(null);
    expect(component.profileForm.value.logo).toEqual(null);
    expect(component.profileForm.value.date_release).toEqual(null);
  });

  it('initForm()', () => {
    spyOn(productsService, 'getProductAction').and.returnValue({
      id: 'exampleId',
      name: 'Example Product',
      description: 'This is an example product.',
      logo: 'example-logo.png',
      date_release: '2023-10-25',
      date_revision: '2024-10-26'
    });
    component.initForm();

    expect(component.profileForm.value.name).toEqual('Example Product');
    expect(component.profileForm.value.description).toEqual('This is an example product.');
    expect(component.profileForm.value.logo).toEqual('example-logo.png');
  });
});
