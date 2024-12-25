<script lang="ts" setup>
import { ref } from 'vue';

import { type ColumnOption } from '@vben/types';

// const props = defineProps({
//   pageIndex: {
//     type: Number,
//     default: 1,
//   },
//   pageLength: {
//     type: Number,
//     default: 10,
//   },
//   totalSize: {
//     type: Number,
//     default: 0,
//   },
//   data: {
//     type: Array,
//     default: () => [],
//   },
//   columnOption: ColumnOption,
// });

const {
  pageIndexProp = 1,
  pageLengthProp = 10,
  totalSizeProp = 0,
} = defineProps<{
  columnOptions: ColumnOption[];
  data: any[];
  pageIndexProp?: number;
  pageLengthProp?: number;
  totalSizeProp?: number;
}>();
const emit = defineEmits(['pagination']);
const pageIndex = ref(pageIndexProp);
const pageLength = ref(pageLengthProp);
const totalSize = ref(totalSizeProp);
function handleSizeChange() {
  if (pageIndex.value * pageLength.value > totalSize.value) {
    pageIndex.value = 1;
  }
  emit('pagination', { pageIndex, pageLength });
}
function handleCurrentChange() {
  emit('pagination', {
    pageIndex: pageIndex.value,
    pageLength: pageLength.value,
  });
}

const handleClick = () => {
  // console.log('click');
};
</script>

<template>
  <h1>pageIndex: {{ pageIndex }} pageLength: {{ pageLength }}</h1>
  <el-table :data="data" style="width: 100%">
    <template
      v-for="(
        { fixed, label, minWidth, prop, type, width }, index
      ) in columnOptions"
    >
      <el-table-column
        v-if="type === 'default'"
        :key="`selection_${index}`"
        :fixed="fixed"
        :label="label"
        :min-width="minWidth"
        :prop="prop"
        :width="width"
      />
    </template>

    <!--    <el-table-column label="Name" prop="name" width="120" />-->
    <!--    <el-table-column label="State" prop="state" width="120" />-->
    <!--    <el-table-column label="City" prop="city" width="120" />-->
    <!--    <el-table-column label="Address" prop="address" width="600" />-->
    <!--    <el-table-column label="Zip" prop="zip" width="120" />-->
    <el-table-column fixed="right" label="Operations" min-width="120">
      <template #default>
        <el-button link size="small" type="primary" @click="handleClick">
          Detail
        </el-button>
        <el-button link size="small" type="primary">Edit</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="example-pagination-block">
    <el-pagination
      :current-page="pageIndex"
      :page-size="pageLength"
      :total="totalSize"
      layout="prev, pager, next"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
  </div>
</template>

<style scoped>
.example-pagination-block + .example-pagination-block {
  margin-top: 10px;
}

.example-pagination-block .example-demonstration {
  margin-bottom: 16px;
}
</style>
