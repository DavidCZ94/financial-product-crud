import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRegistrationComponent } from './product-registration.component';

describe('ProductRegistrationComponent', () => {
  let component: ProductRegistrationComponent;
  let fixture: ComponentFixture<ProductRegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductRegistrationComponent]
    });
    fixture = TestBed.createComponent(ProductRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
