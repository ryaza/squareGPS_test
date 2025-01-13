import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: 'map',
  },
  {
    path: '/about',
    name: 'about',
    components: {
      default: () => import(/* webpackChunkName: "about" */ '@/views/AboutView.vue'),
      header: () => import(/* webpackChunkName: "header" */ '@/components/CustomHeader.vue'),
    },
  },
  {
    path: '/map',
    name: 'map',
    components: {
      default: () => import(/* webpackChunkName: "map" */ '@/views/MapView.vue'),
      header: () => import(/* webpackChunkName: "header" */ '@/components/CustomHeader.vue'),
    },
  },
  {
    path: '/map/:id',
    name: 'mapWithId',
    components: {
      default: () => import(/* webpackChunkName: "map" */ '@/views/MapView.vue'),
      header: () => import(/* webpackChunkName: "header" */ '@/components/CustomHeader.vue'),
    },
    props: {
      default: true,
      header: false,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
