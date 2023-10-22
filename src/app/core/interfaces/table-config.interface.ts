import { Product } from "./product.interface";

export interface TableConfig {
  data?: Product[],
  header: string[],
  pagination: Pagination
}

export interface Pagination {
  page: number,
  pageSize: number,
  pageOptions?: number[]
}
