<script lang="ts" setup>
import { ref } from 'vue';

import { type ColumnOption, type TableOption } from '@vben/types';

import PaginationTable from '#/components/PaginationTable.vue';

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Home',
  },
  {
    date: '2016-05-04',
    name: 'jerry',
    state: 'California1',
    city: 'Los Angeles1',
    address: 'No. 189, Grove St, Los Angeles1',
    zip: 'CA 900361',
    tag: 'Home1',
  },
];

/**
 * date: '2016-05-03',
 *     name: 'Tom',
 *     state: 'California',
 *     city: 'Los Angeles',
 *     address: 'No. 189, Grove St, Los Angeles',
 *     zip: 'CA 90036',
 *     tag: 'Home',
 */
const columnOptions: ColumnOption[] = [
  {
    label: 'date',
    type: 'text',
    prop: 'date',
  },
  {
    label: 'name',
    type: 'text',
    prop: 'name',
  },
  {
    label: 'state',
    type: 'text',
    prop: 'state',
  },
  {
    label: 'city',
    type: 'text',
    prop: 'city',
  },
  {
    label: 'address',
    type: 'text',
    prop: 'address',
  },
  {
    label: '操作',
    prop: '',
    type: 'operation',
    operations: [
      {
        show: () => true,
        text: 'Detail',
        type: 'primary',
        // eslint-disable-next-line no-console
        fn: (row: any, index: number) => console.log('click', row, index),
        size: 'small',
      },
      {
        show: () => true,
        text: 'Edit',
        type: 'primary',
        // eslint-disable-next-line no-console
        fn: (row: any, index: number) => console.log('click', row, index),
        size: 'small',
      },
    ],
  },
];
const table = ref<TableOption<any>>({
  data: tableData,
  columnOptions,
  pageIndex: 1,
  pageLength: 10,
  total: 100,
  showSelect: true,
  selectable: (_row, _i) => true,
});

function getPaginationData(val: { pageIndex: number; pageLength: number }) {
  const { pageIndex, pageLength } = val;
  table.value.pageIndex = pageIndex;
  table.value.pageLength = pageLength;
}
</script>

<template>
  <PaginationTable :table="table" @pagination="getPaginationData" />
</template>
