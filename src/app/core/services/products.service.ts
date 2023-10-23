import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../interfaces/product.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products';

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
}
