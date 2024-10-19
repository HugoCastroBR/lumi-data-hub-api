export interface IPagination<T> {
  page: number;
  orderby: T;
  order: 'asc' | 'desc';
  search?: string;
  year?: number;
}
