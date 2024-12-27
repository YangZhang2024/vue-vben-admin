interface Operation {
  fn: (row: any, index: number) => void;
  show: () => boolean;
  size: 'default' | 'large' | 'small';
  text: string;
  type: 'danger' | 'info' | 'primary' | 'success' | 'text' | 'warning';
}

interface ColumnOption {
  fixed?: 'left' | 'right';
  label: string;
  minWidth?: number | string;
  operations?: Operation[];
  prop: string;
  type: 'operation' | 'text';
  width?: number | string;
}

interface TableOption<T> {
  columnOptions: ColumnOption[];
  data: T[];
  pageIndex: number;
  pageLength: number;
  selectable?: (row: any, index: number) => boolean;
  showSelect: boolean;
  total: number;
}

export type { ColumnOption, TableOption };
