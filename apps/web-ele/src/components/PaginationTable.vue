<script lang="ts" setup>
import { type TableOption } from '@vben/types';

const { table } = defineProps<{
  table: TableOption<any>;
}>();

const emit = defineEmits(['pagination', 'selectedChanged']);

function handleSizeChange(newPageSize: number) {
  let newPageIndex = table.pageIndex;
  if (table.pageIndex * newPageSize > table.total) {
    newPageIndex = 1;
  }
  emit('pagination', { newPageIndex, newPageSize });
}

function handleCurrentChange(newPageIndex: number) {
  emit('pagination', {
    pageIndex: newPageIndex,
    pageLength: table.pageLength,
  });
}

function handleSelectionChange(selectedData: any[]) {
  emit('selectedChanged', selectedData);
}
</script>

<template>
  <div>
    <el-table
      :data="table.data"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <template v-if="table.showSelect">
        <el-table-column
          :selectable="
            (row: any, i: number) =>
              table.selectable && table.selectable(row, i)
          "
          type="selection"
          width="55"
        />
      </template>

      <template
        v-for="(
          { fixed, label, minWidth, prop, type, width, operations }, _columnIdx
        ) in table.columnOptions"
        :key="`selection_${type}_${_columnIdx}`"
      >
        <el-table-column
          :fixed="fixed"
          :label="label"
          :min-width="minWidth"
          :prop="prop"
          :width="width"
        >
          <template #default="{ row, $index }">
            <template v-if="type === 'text'">{{ row[prop] }}</template>
            <template v-else-if="type === 'operation'">
              <template v-for="(opt, i) in operations" :key="`opt_${i}`">
                <template v-if="opt.show()">
                  <el-button
                    :size="opt.size"
                    :type="opt.type"
                    link
                    @click="opt.fn(row, $index)"
                  >
                    {{ opt.text }}
                  </el-button>
                </template>
              </template>
            </template>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="example-pagination-block">
      <el-pagination
        :current-page="table.pageIndex"
        :page-size="table.pageLength"
        :total="table.total"
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </div>
  </div>
</template>

<style scoped>
.example-pagination-block {
  display: flex;
  flex-direction: row-reverse;
  margin-top: 10px;
  margin-bottom: 16px;
}
</style>
