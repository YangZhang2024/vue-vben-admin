<script lang="ts" setup>
import type { VbenFormProps } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { ElButton } from 'element-plus';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { requestClient } from '#/api/request';

interface ProjectDTO {
  description: string;
  owner: string;
  id: number;
  created: string;
  updated: string;
  name: string;
}

/**
 * 获取示例表格数据
 */
async function getExampleTableApi(params: any) {
  return requestClient
    .post('project/search', {
      pageIndex: params.pageIndex,
      pageLength: params.pageLength,
      data: params.data,
    })
    .then((response) => {
      return {
        total: response.totalSize,
        items: response.data,
      };
    });
}

const formOptions: VbenFormProps = {
  // 默认展开
  collapsed: false,
  schema: [
    {
      component: 'Input',
      componentProps: {
        placeholder: 'Please enter name',
      },
      defaultValue: '',
      fieldName: 'name',
      label: 'Name',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: 'Please enter description',
      },
      defaultValue: '',
      fieldName: 'description',
      label: 'Description',
    },
  ],
  // 控制表单是否显示折叠按钮
  showCollapseButton: true,
  submitButtonOptions: {
    content: '查询',
  },
  // 是否在字段值改变时提交表单
  submitOnChange: false,
  // 按下回车时是否提交表单
  submitOnEnter: true,
};

const gridOptions: VxeGridProps<ProjectDTO> = {
  checkboxConfig: {
    highlight: true,
    labelField: 'id',
  },
  columns: [
    { align: 'left', title: 'Id', type: 'checkbox', width: 100 },
    { field: 'name', title: 'Name' },
    { field: 'owner', title: 'Owner' },
    { field: 'created', title: 'Created' },
    { field: 'description', title: 'Description' },
  ],
  exportConfig: {},
  // height: 'auto', // 如果设置为 auto，则必须确保存在父节点且不允许存在相邻元素，否则会出现高度闪动问题
  keepSource: true,
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        return await getExampleTableApi({
          pageIndex: page.currentPage,
          pageLength: page.pageSize,
          data: formValues,
        });
      },
    },
  },
  toolbarConfig: {
    custom: true,
    export: true,
    // import: true,
    refresh: true,
    zoom: true,
  },
};

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions,
  gridOptions,
});
</script>

<template>
  <div class="vp-raw w-full">
    <Grid>
      <template #toolbar-tools>
        <ElButton class="mr-2" type="primary" @click="() => gridApi.query()">
          刷新当前页面
        </ElButton>
        <ElButton type="primary" @click="() => gridApi.reload()">
          刷新并返回第一页
        </ElButton>
      </template>
    </Grid>
  </div>
</template>
