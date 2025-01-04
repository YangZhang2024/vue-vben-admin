<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, shallowRef } from 'vue';

import { Editor, Toolbar } from '@wangeditor/editor-for-vue';

import '@wangeditor/editor/dist/css/style.css'; // 引入 css
// import '@vben/styles';

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

// 内容 HTML
const valueHtml = ref('<p>hello</p>');
const mode = ref('default');

// 模拟 ajax 异步获取内容
onMounted(() => {
  // 修改菜单栏背景颜色
  // editorRef.value.lastChild.style.background = '#000';
  // 修改编辑框背景颜色
  // editorRef.value.toolbarSelector.firstChild.style.background = '#000';
  setTimeout(() => {
    valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>';
  }, 1500);
});

const toolbarConfig = {};
const editorConfig = {
  placeholder: '请输入内容...',
  MENU_CONF: {
    // color: {
    //   colors: ['#000', '#333', '#666'],
    // },
    // bgColor: {
    //   colors: ['#000', '#333', '#666'],
    // },
  },
};

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor === null) return;
  editor.destroy();
});

const handleCreated = (editor) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};
</script>
<template>
  <div class="editor" style="background-color: #333; border: 1px solid #333">
    <Toolbar
      :default-config="toolbarConfig"
      :editor="editorRef"
      :mode="mode"
      style="border-bottom: 1px solid #ccc"
    />
    <Editor
      v-model="valueHtml"
      :default-config="editorConfig"
      :mode="mode"
      style="height: 500px; overflow-y: hidden; background-color: #333"
      @on-created="handleCreated"
    />
  </div>
</template>

<style scoped></style>
