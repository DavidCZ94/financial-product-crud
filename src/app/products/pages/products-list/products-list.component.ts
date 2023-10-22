import { Component } from '@angular/core';
import { TableConfig } from 'src/app/core/interfaces/table-config.interface';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent {

  tableConfig!: TableConfig;

  constructor(
    private productsService: ProductsService
  ) {
    this.tableConfig = this.getTableConfig();
  }

  ngOnInit(): void {
    this.productsService.getProducts().subscribe({
      next: (products) => {
        this.tableConfig.data = products;
      }
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
      ]
    }
  }
}
