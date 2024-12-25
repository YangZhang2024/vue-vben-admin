interface ColumnOption {
  fixed?: 'left' | 'right';
  label: string;
  minWidth?: number | string;
  prop: string;
  type: 'default' | 'expand' | 'index' | 'selection';
  width?: number | string;
}

export type { ColumnOption };
