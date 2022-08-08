import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('../views/BeforeLogin/HomeView.vue'),
  },
  {
    path: '/login',
    component: () => import('../views/BeforeLogin/LogIn.vue'),
  },
  {
    path: '/signup',
    component: () => import('../views/BeforeLogin/SignUp.vue'),
  },
  {
    path: '/dashboard',
    component: () => import('../views/AfterLogin/DashboardView.vue'),
    children: [
      {
        path: 'book',
        component: () => import('../views/AfterLogin/MyAccountBook.vue'),
      },
      {
        path: 'graph',
        component: () => import('../views/AfterLogin/GraphAnalysis.vue'),
      },
      {
        path: 'setting',
        component: () => import('../views/AfterLogin/MySetting.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../views/NotFoundView.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
