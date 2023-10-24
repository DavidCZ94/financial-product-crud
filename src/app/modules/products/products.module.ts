import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { ProductRegistrationComponent } from './pages/product-registration/product-registration.component';
import { ProductsService } from '../../core/services/products.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from '../../core/interceptors/auth.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorHandlerInterceptor } from '../../core/interceptors/error-handler.interceptor';
import { DeleteConfirmationModalComponent } from './pages/components/delete-confirmation-modal/delete-confirmation-modal.component';


@NgModule({
  declarations: [
    ProductsListComponent,
    ProductRegistrationComponent,
    DeleteConfirmationModalComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    ProductsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true
    },
    DatePipe
  ]
})
export class ProductsModule { }
