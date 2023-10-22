import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { Product } from 'src/app/core/interfaces/product.interface';
import { TableConfig } from 'src/app/core/interfaces/table-config.interface';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent {

  tableConfig!: TableConfig;
  producs: Product[] = [];
  searchControl = new FormControl('');
  searchResults: any[] = [];

  constructor(
    private productsService: ProductsService
  ) {
    this.tableConfig = this.getTableConfig();
    this.configSearch();
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.productsService.getProducts().subscribe({
      next: (products) => {
        this.producs = products;
        this.tableConfig.data = products;
      }
    });
  }

  configSearch(): void {
    this.searchControl.valueChanges
    .pipe(debounceTime(300))
    .subscribe(
      (searchTerm) => {
        if (searchTerm) {
        this.searchResults = this.searchProducts(searchTerm);
      }else{
        this.searchResults = this.producs;
      }
      this.tableConfig.data = this.searchResults;
    });
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
        pageSize: 10,
        pageOptions: [5, 10, 20]
      }
    }
  }

  searchProducts(searchTerm: string ) : any[] {
    return this.producs.filter((product) => {
      return product.name.toLowerCase().includes(searchTerm.toLowerCase());
    })
  }

}
