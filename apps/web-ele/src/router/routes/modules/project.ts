import type { RouteRecordRaw } from 'vue-router';

import { BasicLayout } from '#/layouts';
import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      icon: 'lucide:layout-dashboard',
      order: -1,
      title: $t('project.title'),
    },
    name: 'Project',
    path: '/project',
    children: [
      {
        name: 'ProjectManagement',
        path: '/project/management',
        component: () => import('#/views/project/management/index.vue'),
        meta: {
          affixTab: true,
          icon: 'lucide:area-chart',
          title: $t('project.management.title'),
        },
      },
      {
        name: 'Bug',
        path: '/project/bug',
        component: () => import('#/views/dashboard/workspace/index.vue'),
        meta: {
          icon: 'carbon:workspace',
          title: $t('project.bug.title'),
        },
      },
    ],
  },
];

export default routes;
