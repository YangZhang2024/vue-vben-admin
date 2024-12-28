export interface Result<T> {
  result: T;
  code: number;
  msg: string;
  success: boolean;
}

export interface PageData<T> {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
}
