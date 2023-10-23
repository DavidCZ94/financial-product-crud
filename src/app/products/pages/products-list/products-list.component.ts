import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs';
import { Product } from 'src/app/core/interfaces/product.interface';
import { Pagination, TableConfig } from 'src/app/core/interfaces/table-config.interface';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent {

  tableConfig!: TableConfig;
  products: Product[] = [];
  pagedProducts: Product[] = [];
  searchControl = new FormControl('');
  searchedProducts: Product[] = [];

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {
    this.tableConfig = this.getTableConfig();
    this.configSearch();
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.productsService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.searchedProducts = this.getSearchedProducts('', this.products);
        this.setDataToShow();
      }
    });
  }

  configSearch(): void {
    this.searchControl.valueChanges
    .pipe(debounceTime(300))
    .subscribe(
      (searchTerm) => {
        this.tableConfig.pagination.page = 1;
        this.searchedProducts = this.getSearchedProducts(searchTerm || '', this.products);
        this.setDataToShow();
      }
    );
  }

  getTableConfig(): TableConfig {
    return {
      header: [
        'Logo',
        'Nombre del producto',
        'Descripción',
        'Fecha de liberación',
        'Fecha de reestructuracion'
      ],
      pagination: {
        page: 1,
        pageSize: 5,
        pageOptions: [5, 10, 20],
        totalPages: 0
      }
    }
  }

  getSearchedProducts(searchTerm: string, products: Product[] ): Product[] {
    searchTerm = searchTerm.toLowerCase();
    return products.filter((product) => {
      return product.name.toLowerCase().includes(searchTerm);
    });
  }

  changePage(page: number): void {
    this.tableConfig.pagination.page = page;
    this.setDataToShow();
  }

  changePageSize(): void {
    this.tableConfig.pagination.page = 1;
    this.setDataToShow();
  }

  setDataToShow(): void {
    this.tableConfig.pagination.totalPages = this.getTotalPages(this.tableConfig.pagination ,this.searchedProducts);
    this.pagedProducts = this.updatePagedProducts(this.searchedProducts, this.tableConfig.pagination);
  }


  updatePagedProducts(products: Product [], pagination: Pagination): Product[] {
    const { pageSize, page } = pagination;
    const startIndex = (page - 1) * pageSize;
    return products.slice(startIndex, +startIndex + +pageSize);
  }

  getTotalPages(paginationConfig: Pagination, products: Product[]): number {
    const totalItems = products.length; // or this.products.length for all products
    const pageSize = paginationConfig.pageSize;
    return Math.ceil(totalItems / pageSize);
  }

  reditectToProductRegistration(): void {
    console.log(`🚀 ~ reditectToProductRegistration:`);
    this.router.navigate(['/products/product-registration']);
  }

}
