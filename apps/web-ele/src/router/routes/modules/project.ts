import type { RouteRecordRaw } from 'vue-router';

import { BasicLayout } from '#/layouts';

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      icon: 'ic:baseline-view-in-ar',
      keepAlive: true,
      order: 1000,
      title: '项目',
    },
    name: 'Project',
    path: '/project',
    children: [
      {
        meta: {
          title: '项目管理',
        },
        name: 'ProjectManagement',
        path: '/project/management',
        component: () => import('#/views/project/management/index.vue'),
      },
      {
        meta: {
          title: 'bug 管理',
        },
        name: 'BugManagement',
        path: '/project/bug',
        component: () => import('#/views/project/bug/index.vue'),
      },
      {
        meta: {
          title: 'bug 管理',
        },
        name: 'BugDetail',
        path: '/project/bug-detail',
        component: () => import('#/views/project/bug/BugDetail.vue'),
      },
    ],
  },
];

export default routes;
