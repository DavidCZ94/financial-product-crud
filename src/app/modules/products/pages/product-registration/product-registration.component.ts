import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { Product } from 'src/app/core/interfaces/product.interface';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-product-registration',
  templateUrl: './product-registration.component.html',
  styleUrls: ['./product-registration.component.css']
})
export class ProductRegistrationComponent {
  profileForm = new FormGroup({
    id: new FormControl('',
      {
        asyncValidators: [this.validateIdAsync.bind(this)],
        validators: [Validators.required, Validators.minLength(3), Validators.maxLength(10)],
        updateOn: 'change',
      }
    ),
    name: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
    description: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]),
    logo: new FormControl('', [Validators.required]),
    date_release: new FormControl('', [Validators.required, this.validateReleaseDate]),
    date_revision: new FormControl({ disabled: true, value: ''},[Validators.required])
  });
  productAction!: Product | null;

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.setRevisionDate();
  }

  initForm(): void {
    this.productAction = this.productsService.getProductAction();
    if (this.productAction) {
      this.profileForm.get('id')?.setValue(this.productAction.id);
      this.profileForm.get('id')?.clearAsyncValidators();
      this.profileForm.get('id')?.updateValueAndValidity();
      this.profileForm.get('id')?.disable();

      this.profileForm.get('name')?.setValue(this.productAction.name);
      this.profileForm.get('description')?.setValue(this.productAction.description);
      this.profileForm.get('logo')?.setValue(this.productAction.logo);

    }
  }

  setRevisionDate() {
    this.profileForm.get('date_release')?.valueChanges.subscribe((value) => {
      if(!value) return;
      const aYearAfter = new Date(value);
      aYearAfter.setFullYear(aYearAfter.getFullYear() + 1);
      aYearAfter.setDate(aYearAfter.getDate() + 1);

      this.profileForm.get('date_revision')?.enable();
      this.profileForm.get('date_revision')?.setValue(
        this.datePipe.transform(aYearAfter, 'yyyy-MM-dd')
      );
      this.profileForm.get('date_revision')?.disable();
    });
  }

  validateIdAsync(control: AbstractControl) {
    return this.productsService.productIdExist(control.value).pipe(
      map(isValid => (isValid ? { idInvalid: true } : null)),
      catchError(() => of(null)));
  }

  validateReleaseDate(control: AbstractControl) {
    const selectedDate = new Date(control.value);
    const today = new Date();

    selectedDate.setHours(0, 0, 0, 0);
    selectedDate.setDate(selectedDate.getDate() + 2);
    today.setHours(0, 0, 0, 0);

    if (selectedDate <= today) {
      return { dateInvalid: true };
    }

    return null;
  }


  submit() {
    this.productAction ? this.updateProduct() : this.saveProduct();
  }

  updateProduct() {
    this.profileForm.get('id')?.enable();
    this.formatDateRevision()
    this.productsService.updateProduct(this.profileForm.value).subscribe({
      next: (response) => {
        console.log(response);
        this.profileForm.reset();
        this.router.navigate(['/products']);
      }
    });
  }

  formatDateRevision(){
    const aYearAfter = new Date(this.profileForm.get('date_release')?.value || '');
    aYearAfter.setFullYear(aYearAfter.getFullYear() + 1);
    aYearAfter.setDate(aYearAfter.getDate() + 1);

    this.profileForm.get('date_revision')?.enable();
    this.profileForm.get('date_revision')?.setValue(
      this.datePipe.transform(aYearAfter, 'yyyy-MM-dd')
    );
  }

  saveProduct() {
    this.formatDateRevision();
    this.createProduct(this.profileForm.value);
    this.profileForm.get('date_revision')?.disable();
  }

  reset(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.profileForm.reset();
  }

  createProduct(newProduct: any): void {
    this.productsService.createProduct(newProduct).subscribe({
      next: (response) => {
        console.log(response);
        this.profileForm.reset();
        this.router.navigate(['/products']);
      }
    });
  }
}
