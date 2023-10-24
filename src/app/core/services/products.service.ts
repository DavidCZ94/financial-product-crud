import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../interfaces/product.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = environment.productsApuUrl;
  private productAction: Product | null = null;

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  productIdExist(id: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/verification?id=${id}`);
  }

  createProduct(newProduct: any): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, newProduct);
  }

  deleProduct(id: string): Observable<Product> {
    return this.http.delete<Product>(`${this.apiUrl}?id=${id}`);
  }

  setProductAction(product: Product | null): void {
    this.productAction = product;
  }

  getProductAction(): Product | null {
    return this.productAction;
  }

  updateProduct(product: any): Observable<Product> {
    return this.http.put<Product>(this.apiUrl, product);
  }
}
