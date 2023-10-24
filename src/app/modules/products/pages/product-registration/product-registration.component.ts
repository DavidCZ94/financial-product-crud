import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
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
    date_revision: new FormControl(
      { disabled: true, value: ''},
      [Validators.required])
  });

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.setRevisionDate();
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
    const aYearAfter = new Date(this.profileForm.get('date_release')?.value || '');
    aYearAfter.setFullYear(aYearAfter.getFullYear() + 1);
    aYearAfter.setDate(aYearAfter.getDate() + 1);

    this.profileForm.get('date_revision')?.enable();
    this.profileForm.get('date_revision')?.setValue(
      this.datePipe.transform(aYearAfter, 'yyyy-MM-dd')
    );

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
